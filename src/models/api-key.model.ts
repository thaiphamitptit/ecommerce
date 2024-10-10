import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { IApiKey } from '@/shared/types/api-key'

const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'

const apiKeySchema = new Schema<IApiKey>(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    key: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'revoked'],
      default: 'active'
    },
    permissions: {
      type: [String],
      required: true,
      enum: ['0001', '0010', '0100', '1000']
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export const apiKeyModel = model<IApiKey>(DOCUMENT_NAME, apiKeySchema)
