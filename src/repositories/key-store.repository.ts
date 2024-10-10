import { keyStoreModel } from '@/models/key-store.model'
import { ICreateNewKeyStoreBody } from '@/shared/types/key-store'

export default class KeyStoreRepository {
  static createNewKeyStore = async (body: ICreateNewKeyStoreBody) => {
    const { user } = body
    const filter = {
      user
    }
    const update = {
      $set: body
    }
    const options = {
      new: true,
      upsert: true
    }
    return await keyStoreModel.findOneAndUpdate(filter, update, options)
  }

  static findKeyStoreByUser = async (user: string) => {
    const filter = {
      user
    }
    return await keyStoreModel.findOne(filter)
  }
}
