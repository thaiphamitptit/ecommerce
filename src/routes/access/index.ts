import { Router } from 'express'
import { validateSchema } from '@/middlewares/validator.middleware'
import accessController from '@/controllers/access.controller'
import { registerReqBody } from '@/shared/validators/access.validator'
import asyncHandler from '@/shared/helpers/async-handler'

const accessRoutes = Router()

accessRoutes.post('/register', validateSchema(registerReqBody, 'body'), asyncHandler(accessController.register))

export default accessRoutes
