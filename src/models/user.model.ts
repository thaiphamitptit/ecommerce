import { model, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import slugify from 'slugify'
import { IUser } from '@/shared/types/user'

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    dob: {
      type: Date,
      default: null
    },
    roles: {
      type: [String],
      default: ['user']
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'block'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('name') || this.isNew) {
    const base = slugify(this.name, {
      lower: true,
      strict: true
    })
    let slug = base
    let counter = 1
    while (await userModel.exists({ slug })) {
      slug = `${base}${counter++}`
    }
    this.slug = slug
  }
  next()
})

export const userModel = model<IUser>(DOCUMENT_NAME, userSchema)
