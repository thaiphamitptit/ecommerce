import bcrypt from 'bcrypt'
import { generateKeyPairSync, randomBytes } from 'crypto'
import UserRepository from '@/repositories/user.repository'
import KeyStoreRepository from '@/repositories/key-store.repository'
import { BadRequest } from '@/shared/responses/error.response'
import { generateTokenPair } from '@/shared/helpers/jwt-handler'
import { getInfoData } from '@/shared/utils'
import { ErrorMessages } from '@/shared/constants'

export default class AccessService {
  static register = async (email: string, name: string) => {
    /** Check user exists or not */
    const user = await UserRepository.findUserByEmail(email)
    if (user) {
      throw new BadRequest({
        message: ErrorMessages.EMAIL_ALREADY_REGISTERED
      })
    }
    /** Hash password */
    const tempPassword = randomBytes(16).toString('hex')
    const hashPassword = await bcrypt.hash(tempPassword, 10)
    /** Create new user */
    const newUser = await UserRepository.createNewUser({
      email,
      name,
      password: hashPassword
    })
    /** Generate key pair */
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 4096,
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      },
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
      }
    })
    /** Generate token pair */
    const { _id: userId } = newUser
    const tokens = await generateTokenPair({
      payload: {
        userId,
        email
      },
      secretOrPrivateKey: privateKey
    })
    /** Create new key store */
    await KeyStoreRepository.createNewKeyStore({
      user: userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken
    })
    return {
      user: getInfoData(newUser.toObject(), ['_id', 'email', 'name']),
      tokens
    }
  }
}
