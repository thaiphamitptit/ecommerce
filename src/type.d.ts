import { IApiKey } from '@/shared/types/apikey'
import { IUserInfo } from '@/shared/types/user'
import { IKeyStore } from '@/shared/types/key-store'

declare module 'express' {
  interface Request {
    apiKey?: IApiKey
    userInfo?: IUserInfo
    keyStore?: IKeyStore
    refreshToken?: string
    accessToken?: string
  }
}
