import { NextFunction, Request, Response } from 'express'
import KeyStoreRepository from '@/repositories/key-store.repository'
import UserRepository from '@/repositories/user.repository'
import { AuthFailure, Forbidden } from '@/shared/responses/error.response'
import { verifyToken } from '@/shared/helpers/jwt-handler'
import { IUserInfo } from '@/shared/types/user'
import { RequestHeaders, ErrorMessages } from '@/shared/constants'

/** Check authentication */
export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /** Check key store exists or not */
    const userId = req.headers[RequestHeaders.USER_ID] as string
    const keyStore = await KeyStoreRepository.findKeyStoreByUser(userId)
    if (!keyStore) {
      throw new AuthFailure({
        message: ErrorMessages.KEY_STORE_NOT_FOUND
      })
    }
    /** Check tokens valid or not */
    const refreshToken = req.headers[RequestHeaders.REFRESH_TOKEN] as string
    if (refreshToken) {
      /** Verify refresh token */
      const userInfo = await verifyToken({
        token: refreshToken,
        secretOrPublicKey: keyStore.publicKey
      })
      if (userId !== userInfo.userId) {
        throw new AuthFailure({
          message: ErrorMessages.INVALID_AUTH_TOKEN
        })
      }
      /** Assign params to request */
      req.keyStore = keyStore
      req.userInfo = userInfo
      req.refreshToken = refreshToken
      next()
    } else {
      const accessToken = req.headers[RequestHeaders.ACCESS_TOKEN] as string
      /** Verify access token */
      const userInfo = await verifyToken({
        token: accessToken,
        secretOrPublicKey: keyStore.publicKey
      })
      if (userId !== userInfo.userId) {
        throw new AuthFailure({
          message: ErrorMessages.INVALID_AUTH_TOKEN
        })
      }
      /** Assign params to request */
      req.keyStore = keyStore
      req.userInfo = userInfo
      req.accessToken = accessToken
      next()
    }
  } catch (err) {
    next(err)
  }
}

/** Check authorization */
export const checkAuthorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      /** Check user exist or not */
      const { email } = req.userInfo as IUserInfo
      const user = await UserRepository.findUserByEmail(email)
      if (!user) {
        throw new AuthFailure({
          message: ErrorMessages.EMAIL_NOT_REGISTERED
        })
      }
      /** Check user roles contain specific role or not */
      if (!user.roles || !roles.some((role) => user.roles.includes(role))) {
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
