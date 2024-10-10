import { Document } from 'mongoose'
import { JwtPayload } from 'jsonwebtoken'

export interface IUser extends Document {
  _id: string
  slug: string
  email: string
  name: string
  password: string
  phone: string
  avatar: string
  dob: Date
  roles: string[]
  status: 'pending' | 'active' | 'block'
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserInfo extends JwtPayload {
  userId: string
  email: string
}

export interface IRegisterReqBody {
  email: string
  name: string
}

export interface ICreateNewUserBody {
  email: string
  name: string
  password?: string
  phone?: string
  avatar?: string
  dob?: Date
  roles?: string[]
  status?: 'pending' | 'active' | 'block'
}
