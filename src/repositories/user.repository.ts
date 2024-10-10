import { userModel } from '@/models/user.model'
import { ICreateNewUserBody } from '@/shared/types/user'

export default class UserRepository {
  static createNewUser = async (body: ICreateNewUserBody) => {
    return await userModel.create(body)
  }

  static findUserByEmail = async (email: string) => {
    const filter = {
      email
    }
    return await userModel.findOne(filter)
  }
}
