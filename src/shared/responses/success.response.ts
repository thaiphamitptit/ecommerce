import { Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

/** Success response */
export class SuccessResponse {
  message: string
  code: number
  status: string
  metadata: object

  constructor({
    message,
    code,
    status,
    metadata
  }: {
    message: string
    code: number
    status: string
    metadata: object
  }) {
    this.message = message
    this.code = code
    this.status = status
    this.metadata = metadata
  }

  send(res: Response) {
    res.status(this.code).json(this)
  }
}

/** 200 */
export class Ok extends SuccessResponse {
  constructor({
    message = ReasonPhrases.OK,
    code = StatusCodes.OK,
    status = 'success',
    metadata = {}
  }: {
    message?: string
    code?: number
    status?: string
    metadata?: object
  }) {
    super({ message, code, status, metadata })
  }
}

/** 201 */
export class Created extends SuccessResponse {
  constructor({
    message = ReasonPhrases.CREATED,
    code = StatusCodes.CREATED,
    status = 'success',
    metadata = {}
  }: {
    message?: string
    code?: number
    status?: string
    metadata?: object
  }) {
    super({ message, code, status, metadata })
  }
}
