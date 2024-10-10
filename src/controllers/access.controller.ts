import { NextFunction, Request, Response } from 'express'
import AccessService from '@/services/access.service'
import { Created } from '@/shared/responses/success.response'
import { IRegisterReqBody } from '@/shared/types/user'
import { SuccessMessages } from '@/shared/constants'

class AccessController {
  register = async (req: Request<any, any, IRegisterReqBody, any>, res: Response, next: NextFunction) => {
    const { email, name } = req.body
    new Created({
      message: SuccessMessages.REGISTER_SUCCESSFULLY,
      metadata: await AccessService.register(email, name)
    }).send(res)
  }
}

const accessController = new AccessController()
export default accessController
