import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
  const code = err.code || StatusCodes.INTERNAL_SERVER_ERROR
  const status = err.status
  const errors = err.errors

  res.status(code).json({
    message,
    code,
    status,
    errors
  })
}

export default errorHandler
