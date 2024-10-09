import mongoose from 'mongoose'
import { configs, env } from '@/configs/env.config'

const { host, port, name } = configs[env].db
const url = `mongodb://${host}:${port}/${name}`

class Database {
  private static instance: Database

  connect(type = 'mongodb') {
    if (env === 'development') {
      mongoose.set('debug', true)
      mongoose.set('debug', {
        color: true
      })
    }
    mongoose
      .connect(url)
      .then(() => {
        console.log('Connected to mongodb successfully')
      })
      .catch((err) => {
        console.log('Connected to mongodb failure ::: ', err)
      })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
      Database.instance.connect()
    }
    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()
export default instanceMongodb
