import bcrypt from 'bcrypt'
import { generateKeyPairSync, randomBytes } from 'crypto'
import UserRepository from '@/repositories/user.repository'
import KeyStoreRepository from '@/repositories/key-store.repository'
import { AuthFailure, BadRequest } from '@/shared/responses/error.response'
import { generateTokenPair } from '@/shared/helpers/jwt-handler'
import { getInfoData } from '@/shared/utils'
import { IUserInfo } from '@/shared/types/user'
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

  static login = async (email: string, password: string) => {
    /** Check user exists or not */
    const user = await UserRepository.findUserByEmail(email)
    if (!user) {
      throw new BadRequest({
        message: ErrorMessages.EMAIL_NOT_REGISTERED
      })
    }
    /** Compare password */
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      throw new AuthFailure({
        message: ErrorMessages.INVALID_CREDENTIALS
      })
    }
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
    const { _id: userId } = user
    const tokens = await generateTokenPair({
      payload: {
        userId,
        email
      },
      secretOrPrivateKey: privateKey
    })
    /** Create or update key store */
    await KeyStoreRepository.createNewKeyStore({
      user: userId,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
      refreshTokensUsed: []
    })
    return {
      user: getInfoData(user.toObject(), ['_id', 'email', 'name']),
      tokens
    }
  }

  static logout = async (userInfo: IUserInfo) => {
    /** Delete key store */
    const { userId } = userInfo
    const deletedKeyStore = await KeyStoreRepository.deleteKeyStoreByUser(userId)
    if (!deletedKeyStore) {
      throw new AuthFailure({
        message: ErrorMessages.KEY_STORE_NOT_FOUND
      })
    }
    return {}
  }
}
