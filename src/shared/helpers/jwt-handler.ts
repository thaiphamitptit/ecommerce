import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken'
import { IUserInfo } from '@/shared/types/user'

export const generateToken = ({
  payload,
  secretOrPrivateKey,
  options
}: {
  payload: string | Buffer | object
  secretOrPrivateKey: Secret
  options: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  secretOrPublicKey,
  options = {}
}: {
  token: string
  secretOrPublicKey: Secret
  options?: VerifyOptions
}) => {
  return new Promise<IUserInfo>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded as IUserInfo)
    })
  })
}

export const generateTokenPair = async ({
  payload,
  secretOrPrivateKey
}: {
  payload: string | Buffer | object
  secretOrPrivateKey: Secret
}) => {
  const [accessToken, refreshToken] = await Promise.all([
    generateToken({
      payload,
      secretOrPrivateKey,
      options: {
        algorithm: 'RS256',
        expiresIn: '30m'
      }
    }),
    generateToken({
      payload,
      secretOrPrivateKey,
      options: {
        algorithm: 'RS256',
        expiresIn: '30d'
      }
    })
  ])
  return {
    accessToken,
    refreshToken
  }
}
