import { Document } from 'mongoose'

export interface IKeyStore extends Document {
  _id: string
  user: string
  privateKey: string
  publicKey: string
  refreshToken: string
  refreshTokensUsed: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateNewKeyStoreBody {
  user: string
  privateKey: string
  publicKey: string
  refreshToken: string
  refreshTokensUsed?: string[]
}
