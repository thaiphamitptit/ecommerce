import Joi from 'joi'
import { RequestHeaders } from '@/shared/constants'

export const authReqHeaders = Joi.object({
  [RequestHeaders.USER_ID]: Joi.string().uuid().required(),
  [RequestHeaders.ACCESS_TOKEN]: Joi.string().optional(),
  [RequestHeaders.REFRESH_TOKEN]: Joi.string().optional()
})
  .or(RequestHeaders.ACCESS_TOKEN, RequestHeaders.REFRESH_TOKEN)
  .unknown(true)
