import _axios from 'axios'
import { DataSource } from '../repository/DataSource'
import { BalanceServerResponse, InternalTransactionResponse, TokenBalanceServerResponse, TokenServerResponse, TokenTransferServerResponse, TransactionServerResponse, TransactionsServerResponse } from './types'
import { fromApiToRtbcBalance, fromApiToTEvents, fromApiToTokenWithBalance, fromApiToTokens, fromApiToTransaction } from './utils'

export class BlockscoutAPI extends DataSource {
  private chainId: number
  private errorHandling = (e) => {
    console.error(e)
    return []
  }

  constructor (apiURL: string, chainId: number, axios: typeof _axios, id: string) {
    super(apiURL, id, axios)
    this.chainId = chainId
  }

  getTokens () {
    return this.axios?.get<TokenServerResponse>(`${this.url}/tokens`)
      .then(response => response.data.items
        .map(token => fromApiToTokens(token, this.chainId)))
      .catch(this.errorHandling)
  }

  getTokensByAddress (address: string) {
    return this.axios?.get<TokenBalanceServerResponse[]>(`${this.url}/addresses/${address.toLowerCase()}/token-balances`)
      .then(response => response.data.filter(t => t.token.name != null)
        .map(token => {
          token.token.value = token.value
          return fromApiToTokenWithBalance(token.token, this.chainId)
        }))
      .catch(this.errorHandling)
  }

  getRbtcBalanceByAddress (address: string) {
    return this.axios?.get<BalanceServerResponse>(`${this.url}/addresses/${address.toLowerCase()}`)
      .then(response => fromApiToRtbcBalance(response.data.coin_balance, this.chainId))
      .catch(this.errorHandling)
  }

  async getEventsByAddress (address: string, limit?: string | undefined) {
    return this.axios?.get<TokenTransferServerResponse>(`${this.url}/addresses/${address.toLowerCase()}/token-transfers`)
      .then(response => 
        response.data.items
        .map(tokenTranfer => {
          return fromApiToTEvents(tokenTranfer)
        }))
      .catch(this.errorHandling)
  }

  getTransaction (hash: string) {
    return this.axios?.get<TransactionServerResponse>(`${this.url}/transactions/${hash}`)
      .then(response => 
        fromApiToTransaction(response.data))
      .catch(this.errorHandling)
  }

  getInternalTransactionByAddress (address: string, limit?: string | undefined) {
    return this.axios?.get<InternalTransactionResponse>(`${this.url}/addresses/${address.toLowerCase()}/internal-transactions`)
      .then(response => response.data.items)
      .catch(this.errorHandling)
  }

  getTransactionsByAddress (address: string, limit?: string | undefined, prev?: string | undefined, next?: string | undefined, blockNumber?: string | undefined) {
    return this.axios?.get<TransactionsServerResponse>(`${this.url}/addresses/${address.toLowerCase()}/transactions`)
      .then(response => response.data.items.map(fromApiToTransaction))
      .catch(this.errorHandling)
  }
}
