import { NextFunction, Request, Response } from 'express'
import ApiKeyRepository from '@/repositories/api-key.repository'
import { Forbidden } from '@/shared/responses/error.response'
import { ErrorMessages, RequestHeaders } from '@/shared/constants'

/** Check api key */
export const checkApiKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** Check api key exists or not */
    const key = req.headers[RequestHeaders.API_KEY] as string
    const apiKey = await ApiKeyRepository.findApiKeyByKey(key)
    if (!apiKey) {
      throw new Forbidden({
        message: ErrorMessages.API_KEY_NOT_FOUND
      })
    }
    /** Assign params to request */
    req.apiKey = apiKey
    next()
  } catch (err) {
    next(err)
  }
}

/** Check permission */
export const checkPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      /** Check api key permission */
      if (!req.apiKey?.permissions || !req.apiKey.permissions.includes(permission)) {
        throw new Forbidden({
          message: ErrorMessages.NOT_ALLOW_ACCESS_RESOURCE
        })
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
