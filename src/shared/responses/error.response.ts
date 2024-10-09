import { ReasonPhrases, StatusCodes } from 'http-status-codes'

/** Error response */
export class ErrorResponse extends Error {
  code: number
  status: string
  errors: object | null

  constructor({
    message,
    code,
    status,
    errors
  }: {
    message: string
    code: number
    status: string
    errors: object | null
  }) {
    super(message)
    this.code = code
    this.status = status
    this.errors = errors
  }
}

/** 400 */
export class BadRequest extends ErrorResponse {
  constructor({
    message = ReasonPhrases.BAD_REQUEST,
    code = StatusCodes.BAD_REQUEST,
    status = 'error',
    errors = null
  }: {
    message?: string
    code?: number
    status?: string
    errors?: object | null
  }) {
    super({ message, code, status, errors })
  }
}

/** 401 */
export class AuthFailure extends ErrorResponse {
  constructor({
    message = ReasonPhrases.UNAUTHORIZED,
    code = StatusCodes.UNAUTHORIZED,
    status = 'error',
    errors = null
  }: {
    message?: string
    code?: number
    status?: string
    errors?: object | null
  }) {
    super({ message, code, status, errors })
  }
}

/** 403 */
export class Forbidden extends ErrorResponse {
  constructor({
    message = ReasonPhrases.FORBIDDEN,
    code = StatusCodes.FORBIDDEN,
    status = 'error',
    errors = null
  }: {
    message?: string
    code?: number
    status?: string
    errors?: object | null
  }) {
    super({ message, code, status, errors })
  }
}

/** 404 */
export class NotFound extends ErrorResponse {
  constructor({
    message = ReasonPhrases.NOT_FOUND,
    code = StatusCodes.NOT_FOUND,
    status = 'error',
    errors = null
  }: {
    message?: string
    code?: number
    status?: string
    errors?: object | null
  }) {
    super({ message, code, status, errors })
  }
}
