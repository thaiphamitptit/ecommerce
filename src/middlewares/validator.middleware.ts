import { Request, Response, NextFunction } from 'express'
import { ObjectSchema, ValidationError } from 'joi'
import { BadRequest } from '@/shared/responses/error.response'
import { ErrorMessages } from '@/shared/constants'

export const validateSchema = (schema: ObjectSchema, property: 'body' | 'params' | 'query' | 'headers' | 'cookies') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req[property], {
        abortEarly: false
      })
      next()
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors = err.details.reduce<Record<string, string[]>>((acc, { path, message }) => {
          return {
            ...acc,
            [path.join('.')]: [...(acc[path.join('.')] || []), message]
          }
        }, {})
        next(
          new BadRequest({
            message: ErrorMessages.VALIDATION_ERROR,
            errors
          })
        )
      } else {
        next(err)
      }
    }
  }
}
