import { IApiKey } from '@/shared/types/apikey'

declare module 'express' {
  interface Request {
    apiKey?: IApiKey
  }
}
