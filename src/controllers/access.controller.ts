import { NextFunction, Request, Response } from 'express'
import AccessService from '@/services/access.service'
import { Created, Ok } from '@/shared/responses/success.response'
import { ILoginReqBody, IRegisterReqBody, IUserInfo } from '@/shared/types/user'
import { IKeyStore } from '@/shared/types/key-store'
import { SuccessMessages } from '@/shared/constants'

class AccessController {
  register = async (req: Request<any, any, IRegisterReqBody, any>, res: Response, next: NextFunction) => {
    const { email, name } = req.body
    new Created({
      message: SuccessMessages.REGISTER_SUCCESSFULLY,
      metadata: await AccessService.register(email, name)
    }).send(res)
  }

  login = async (req: Request<any, any, ILoginReqBody, any>, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    new Ok({
      message: SuccessMessages.LOGIN_SUCCESSFULLY,
      metadata: await AccessService.login(email, password)
    }).send(res)
  }

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.userInfo as IUserInfo
    new Ok({
      message: SuccessMessages.LOGOUT_SUCCESSFULLY,
      metadata: await AccessService.logout(userInfo)
    }).send(res)
  }

  refreshTokens = async (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.userInfo as IUserInfo
    const keyStore = req.keyStore as IKeyStore
    const refreshToken = req.refreshToken as string
    new Ok({
      message: SuccessMessages.REFRESH_TOKENS_SUCCESSFULLY,
      metadata: await AccessService.refreshTokens(userInfo, keyStore, refreshToken)
    }).send(res)
  }
}

const accessController = new AccessController()
export default accessController
