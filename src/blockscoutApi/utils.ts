import { IApiToken, ITokenWithBalance, Token, TokenTransfer, TransactionServerResponse } from './types'
import tokens from '@rsksmart/rsk-contract-metadata'
import { toChecksumAddress } from '@rsksmart/rsk-utils'

function getLogo (contract:string | null | undefined, chainId:number):string {
  return contract ? tokens[toChecksumAddress(contract, chainId)]?.logo : ''
}

export interface IEvent {
  blockNumber: number;
  event: string;
  timestamp: number;
  topics: string[];
  args: string[];
  transactionHash: string;
  txStatus: string;
}

export interface Receipt {
  transactionHash: string
  transactionIndex: number
  blockHash: string
  blockNumber: number
  cumulativeGasUsed: number
  gasUsed: number
  contractAddress: any
  logs: any[]
  from: string
  to: string
  status: string
  logsBloom: string
  type: string
}

export interface ITransaction {
  _id: string
  hash: string
  nonce: number
  blockHash: string
  blockNumber: number
  transactionIndex: number
  from: string
  to: string
  gas: number
  gasPrice: string
  value: string
  input: string
  v: string
  r: string
  s: string
  type: string
  timestamp: number
  receipt: Receipt
  txType: string
  txId: string
}

export interface IToken {
  name: string;
  logo: string;
  symbol: string;
  contractAddress: string;
  decimals: number;
}

export const fromApiToTokens = (apiToken:IApiToken, chainId: number): IToken =>
  ({
    name: apiToken.name,
    logo: getLogo(apiToken.address, chainId),
    symbol: apiToken.symbol,
    contractAddress: apiToken.address,
    decimals: parseInt(apiToken.decimals)
  })

export const fromApiToTokenWithBalance = (token:Token, chainId: number): ITokenWithBalance =>
  ({
    name: token.name,
    logo: getLogo(token.address, chainId),
    symbol: token.symbol,
    contractAddress: token.address,
    decimals: parseInt(token.decimals),
    balance: token.value
  })

export const fromApiToTEvents = (tokenTransfer:TokenTransfer): IEvent =>
  ({
    blockNumber: 0,
    event: tokenTransfer.method,
    timestamp: Date.parse(tokenTransfer.timestamp),
    topics: [],
    args: [],
    transactionHash: tokenTransfer.tx_hash,
    txStatus: '0x1'
  })

export const fromApiToTransaction = (transaction: TransactionServerResponse): ITransaction => 
({
  _id: '',
  hash: transaction.hash,
  nonce: transaction.nonce,
  blockHash: '',
  blockNumber: transaction.block,
  transactionIndex: 0,
  from: transaction.from.hash,
  to: transaction.to.hash,
  gas: Number(transaction.gas_used),
  gasPrice: transaction.gas_price,
  value: transaction.value,
  input: transaction.raw_input,
  v: '',
  r: '',
  s: '',
  type: String(transaction.type),
  timestamp: Date.parse(transaction.timestamp),
  receipt: {
    transactionHash: transaction.hash,
    transactionIndex: 0,
    blockHash: '',
    blockNumber: transaction.block,
    cumulativeGasUsed: Number(transaction.gas_limit),
    gasUsed: Number(transaction.gas_used),
    contractAddress: null,
    logs:[],
    from: transaction.from.hash,
    to: transaction.to.hash,
    status: transaction.status === 'ok' ? '0x1' : '0x0',
    logsBloom: '',
    type: String(transaction.type)
  },
  txType: transaction.tx_types[0],
  txId: ''
})


export const fromApiToRtbcBalance = (balance:string, chainId: number): ITokenWithBalance =>
  ({
    name: 'RBTC',
    logo: getLogo('0x0000000000000000000000000000000000000000', chainId),
    symbol: 'RBTC',
    contractAddress: '0x0000000000000000000000000000000000000000',
    decimals: parseInt('18'),
    balance
  })