import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import appRoutes from '@/routes'
import { configs, env } from '@/configs/env.config'
import errorHandler from '@/middlewares/error.middleware'
import instanceMongodb from '@/databases/init.mongodb'

const app = express()
const { port } = configs[env].app

/** Init middlewares */
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

/** Init dbs */
instanceMongodb.connect()

/** Init routes */
app.use('/api/v1', appRoutes)

/** Error handler */
app.use(errorHandler)

/** Start server */
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Close server')
  })
})
