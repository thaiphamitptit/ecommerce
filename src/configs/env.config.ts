import { config } from 'dotenv'

config()

/** Development environment */
const development = {
  app: {
    port: process.env.DEV_APP_PORT || 3000
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'ecommerce'
  }
}

/** Production environment */
const production = {
  app: {
    port: process.env.PRO_APP_PORT || 3000
  },
  db: {
    host: process.env.PRO_DB_HOST || 'localhost',
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_NAME || 'ecommerce'
  }
}

export const configs = { development, production }

export const env = (process.env.NODE_ENV || 'development') as 'development' | 'production'
