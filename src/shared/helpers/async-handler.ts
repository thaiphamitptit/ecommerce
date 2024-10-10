import { NextFunction, Request, RequestHandler, Response } from 'express'
import { ParsedQs } from 'qs'

const asyncHandler = <ReqParams, ResBody = any, ReqBody = any, ReqQuery = ParsedQs>(
  handler: RequestHandler<ReqParams, ResBody, ReqBody, ReqQuery>
) => {
  return async (req: Request<ReqParams, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

export default asyncHandler
