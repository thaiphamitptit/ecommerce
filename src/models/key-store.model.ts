import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IKeyStore } from '@/shared/types/key-store'

const DOCUMENT_NAME = 'KeyStore'
const COLLECTION_NAME = 'KeyStores'

const keyStoreSchema = new Schema<IKeyStore>(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    user: {
      type: String,
      required: true,
      ref: 'User'
    },
    privateKey: {
      type: String,
      required: true
    },
    publicKey: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    refreshTokensUsed: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export const keyStoreModel = model<IKeyStore>(DOCUMENT_NAME, keyStoreSchema)
