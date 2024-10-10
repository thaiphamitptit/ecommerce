import Joi from 'joi'
import { RequestHeaders } from '@/shared/constants'

export const apiKeyReqHeaders = Joi.object({
  [RequestHeaders.API_KEY]: Joi.string().required()
}).unknown(true)
