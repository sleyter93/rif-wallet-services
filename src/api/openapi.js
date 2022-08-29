module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Rif Wallet Services',
    version: '1.0.0-beta.2',
    description: '[Repository](https://github.com/rsksmart/rif-wallet-services)'
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server'
    },
    {
      url: 'https://rif-wallet-services.testnet.rifcomputing.net',
      description: 'TestNet'
    }
  ],
  paths: {
    '/tokens': {
      get: {
        summary: 'Get all tokens available in network identified by chainId',
        tags: [
          'Tokens'
        ],
        parameters: [
          {
            name: 'chainId',
            in: 'query',
            description: 'Chain Id identifies the network',
            required: false,
            schema: {
              type: 'string',
              default: '31'
            },
            examples: {
              'RSK Testnet': {
                value: '31'
              },
              'RSK Mainnet': {
                value: '30'
              }
            }
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Token'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/address/{address}/tokens': {
      get: {
        summary: 'Get all tokens available by smart wallet address in network identified by chainId',
        tags: [
          'Tokens'
        ],
        parameters: [
          {
            name: 'address',
            in: 'path',
            description: 'Smart Wallet address',
            required: true,
            schema: {
              type: 'string'
            },
            example: '0x79D09327dF250992865CCCF37f595C59cB2fCd54'
          },
          {
            name: 'chainId',
            in: 'query',
            description: 'Chain Id identifies the network',
            required: false,
            schema: {
              type: 'string',
              default: '31'
            },
            examples: {
              'RSK Testnet': {
                value: '31'
              },
              'RSK Mainnet': {
                value: '30'
              }
            }
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Token'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/address/{address}/events': {
      get: {
        summary: 'Get all events(token transfers) by smart wallet address in network identified by chainId',
        tags: [
          'Events'
        ],
        parameters: [
          {
            name: 'address',
            in: 'path',
            required: true,
            description: 'Smart Wallet address',
            schema: {
              type: 'string'
            },
            example: '0x79D09327dF250992865CCCF37f595C59cB2fCd54'
          },
          {
            name: 'chainId',
            in: 'query',
            description: 'Chain Id identifies the network',
            required: false,
            schema: {
              type: 'string',
              default: '31'
            },
            examples: {
              'RSK Testnet': {
                value: '31'
              },
              'RSK Mainnet': {
                value: '30'
              }
            }
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Event'
                  }
                }
              }
            }
          }
        }
      }
    },
    '/address/{address}/transactions': {
      get: {
        summary: 'Get all transactions paginated by smart wallet address in network identified by chainId',
        tags: [
          'Transactions'
        ],
        parameters: [
          {
            name: 'address',
            in: 'path',
            required: true,
            description: 'Smart Wallet address',
            schema: {
              type: 'string'
            },
            example: '0x79D09327dF250992865CCCF37f595C59cB2fCd54'
          },
          {
            name: 'chainId',
            in: 'query',
            description: 'Chain Id identifies the network',
            required: false,
            schema: {
              type: 'string',
              default: '31'
            },
            examples: {
              'RSK Testnet': {
                value: '31'
              },
              'RSK Mainnet': {
                value: '30'
              }
            }
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Transactions limit',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'prev',
            in: 'query',
            description: 'Chain Id identifies the network',
            required: false,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'next',
            in: 'query',
            description: 'Chain Id identifies the network',
            required: false,
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Transaction'

                      }
                    },
                    prev: {
                      type: 'string',
                      nullable: true
                    },
                    next: {
                      type: 'string',
                      nullable: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/price': {
      get: {
        summary: 'Get token prices',
        tags: [
          'Prices'
        ],
        parameters: [
          {
            name: 'convert',
            in: 'query',
            description: 'Currency',
            required: true,
            schema: {
              type: 'string',
              example: 'USD'
            }
          },
          {
            name: 'addresses',
            in: 'query',
            description: 'list of token address separated by comma',
            required: true,
            schema: {
              type: 'string',
              example: '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5,0xefc78fc7d48b64958315949279ba181c2114abbd'
            }
          }
        ],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  additionalProperties: {
                    type: 'object',
                    properties: {
                      price: {
                        type: 'double',
                        example: 0.06697809474145774
                      },
                      lastUpdated: {
                        type: 'date-time',
                        example: '2022-08-26T06:56:00.000Z'
                      }
                    }
                  },
                  example: {
                    '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5': {
                      price: 0.06697809474145774,
                      lastUpdated: '2022-08-26T06:56:00.000Z'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/dapps': {
      get: {
        tags: [
          'Dapps'
        ],
        responses: {
          200: {
            description: 'successful operation',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      groupName: {
                        type: 'string',
                        example: 'Sample apps'
                      },
                      dapps: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            title: {
                              type: 'string',
                              example: 'rLogin Sample App'
                            },
                            url: {
                              type: 'string',
                              example: 'https://basic-sample.rlogin.identity.rifos.org/'
                            },
                            allowedNetworks: {
                              type: 'array',
                              items: {
                                type: 'integer',
                                example: 31
                              }

                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Token: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Dollar on Chain'
          },
          logo: {
            type: 'string',
            example: 'doc.png'
          },
          symbol: {
            type: 'string',
            example: 'DOC'
          },
          contractAddress: {
            type: 'string',
            example: '0x54c598fa101b6dfab4ee130e11fd0a05c646802d'
          },
          decimals: {
            type: 'integer',
            example: 18
          }
        }
      },
      Event: {
        type: 'object',
        properties: {
          args: {
            type: 'array',
            items: {
              type: 'string',
              example: '0x79d09327df250992865cccf37f595c59cb2fcd54'
            }
          },
          blockNumber: {
            type: 'integer',
            example: 3100279
          },
          event: {
            type: 'string',
            example: 'Transfer'
          },
          timestamp: {
            type: 'integer',
            example: 1660748791
          },
          topics: {
            type: 'array',
            items: {
              type: 'string',
              example: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
            }
          },
          transactionHash: {
            type: 'string',
            example: '0x9b2f7d17072730ea7a5a303045970a24b48f5147950052c80b45b1d9f1776744'
          },
          txStatus: {
            type: 'string',
            example: '0x1'
          }
        }
      },
      Transaction: {
        type: 'object',
        properties: {
          blockHash: {
            type: 'string',
            example: '0x1125c50d7d86a3a1f0539bd71499f113882bb9082f03b161be18edf9acfd0183'
          },
          blockNumber: {
            type: 'integer',
            example: 3123622
          },
          from: {
            type: 'string',
            example: '0xc0c9280c10e4d968394371d5b60ac5fcd1ae62e1'
          },
          gas: {
            type: 'integer',
            example: 32716
          },
          gasPrice: {
            type: 'string',
            example: '0x3e252e0'
          },
          hash: {
            type: 'string',
            example: '0xfb9843a4ebaef4b835dd49a7a348c7133424f8b804e9766c95fca82a13ba115e'
          },
          input: {
            type: 'string',
            example: '0x'
          },
          nonce: {
            type: 'integer',
            example: 9
          },
          r: {
            type: 'string',
            example: '0x5472bad7b7dfea0a7a2f278435369b9590e1c4fb479c74fc124c92a2f32bba1f'
          },
          receipt: {
            type: 'object',
            properties: {
              blockHash: {
                type: 'string',
                example: '0x1125c50d7d86a3a1f0539bd71499f113882bb9082f03b161be18edf9acfd0183'
              },
              blockNumber: {
                type: 'integer',
                example: 3123622
              },
              contractAddress: {
                type: 'string',
                example: '0xc0c9280c10e4d968394371d5b60ac5fcd1ae62e1'
              },
              cumulativeGasUsed: {
                type: 'integer',
                example: 172204
              },
              from: {
                type: 'string',
                example: '0xc0c9280c10e4d968394371d5b60ac5fcd1ae62e1'
              },
              gasUsed: {
                type: 'integer',
                example: 21811
              },
              logs: {
                type: 'array',
                items: {
                  type: 'string'
                }
              },
              logBloom: {
                type: 'string',
                example: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
              },
              status: {
                type: 'string',
                example: '0x1'
              },
              to: {
                type: 'string',
                example: '0x79d09327df250992865cccf37f595c59cb2fcd54'
              },
              transactionHash: {
                type: 'string',
                example: '0xfb9843a4ebaef4b835dd49a7a348c7133424f8b804e9766c95fca82a13ba115e'
              },
              tranactionIndex: {
                type: 'string',
                example: 2
              }
            }
          },
          s: {
            type: 'string',
            example: '0x12fe7d8205870a1ffff17533c0de7d30ea774a9bc706eb9c5c974520a5d6d67f'
          },
          timestamp: {
            type: 'integer',
            example: '1661491330'
          },
          to: {
            type: 'string',
            example: '0x79d09327df250992865cccf37f595c59cb2fcd54'
          },
          transactionIndex: {
            type: 'integer',
            example: 2
          },
          txId: {
            type: 'string',
            example: '02fa9a6002161be18edf9acfd0183'
          },
          txType: {
            type: 'string',
            example: 'contract call'
          },
          v: {
            type: 'string',
            example: '0x61'
          },
          value: {
            type: 'string',
            example: '0x38d7ea4c68000'
          },
          _id: {
            type: 'string',
            example: '630858b2e187231ee824f4c9'
          }
        }
      }
    }
  }
}
