import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkAuthentication } from '@/middlewares/auth.middleware'
import accessController from '@/controllers/access.controller'
import { loginReqBody, registerReqBody } from '@/shared/validators/access.validator'
import { authReqHeaders } from '@/shared/validators/auth.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const accessRoutes = Router()

accessRoutes.post('/register', validateSchema(registerReqBody, 'body'), asyncHandler(accessController.register))
accessRoutes.post('/login', validateSchema(loginReqBody, 'body'), asyncHandler(accessController.login))

/** Check authentication */
accessRoutes.use(validateSchema(authReqHeaders, 'headers'), checkAuthentication)

accessRoutes.post('/logout', asyncHandler(accessController.logout))
accessRoutes.post('/refresh-tokens', asyncHandler(accessController.refreshTokens))

export default accessRoutes
