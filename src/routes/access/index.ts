import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import accessController from '@/controllers/access.controller'
import { loginReqBody, registerReqBody } from '@/shared/validators/access.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const accessRoutes = Router()

accessRoutes.post('/register', validateSchema(registerReqBody, 'body'), asyncHandler(accessController.register))
accessRoutes.post('/login', validateSchema(loginReqBody, 'body'), asyncHandler(accessController.login))

export default accessRoutes
