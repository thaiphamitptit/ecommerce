import { Router } from 'express'
import accessRoutes from '@/routes/access'
import { validateSchema } from '@/middlewares/validator.middleware'
import { checkApiKey, checkPermission } from '@/middlewares/api-key.middleware'
import { apiKeyReqHeaders } from '@/shared/validators/api-key.validator'

const appRoutes = Router()

/** Check api key and permission */
appRoutes.use(validateSchema(apiKeyReqHeaders, 'headers'), checkApiKey)
appRoutes.use(checkPermission('0001'))

appRoutes.use('', accessRoutes)

export default appRoutes
