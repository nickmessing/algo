import { AuthenticationError } from 'apollo-server-errors'
import { S3, Endpoint } from 'aws-sdk'
import { OAuth2Client } from 'google-auth-library'
import { extension } from 'mime-types'
import fetch from 'node-fetch'
import { v4 } from 'uuid'

import type { PrismaClient, User } from '@prisma/client'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const spacesEndpoint = new Endpoint(process.env.SPACES_ENDPOINT)

const s3 = new S3({
  accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
  endpoint: spacesEndpoint,
})

export type CreateContextOptions = {
  token?: string | null
  prisma: PrismaClient
}

export type ApolloContext = {
  prisma: PrismaClient
  user: User | null
}

const uploadPicture = async (url: string) => {
  const response = await fetch(url)
  const buffer = await response.buffer()
  const contentType = response.headers.get('content-type')
  if (contentType == null) {
    throw new Error()
  }
  const ext = extension(contentType)
  if (!ext) {
    throw new Error()
  }
  const fileName = `avatars/${v4()}.${ext}`

  const params = {
    Bucket: process.env.SPACES_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ACL: 'public-read',
  }

  await s3.upload(params).promise()
  return `https://${process.env.SPACES_BUCKET_PUBLIC_DOMAIN}/${fileName}`
}

export const createContext = async ({ token, prisma }: CreateContextOptions): Promise<ApolloContext> => {
  let user: User | null = null

  if (token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
      })
      const payload = ticket.getPayload()

      if (!payload) {
        throw new Error('Invalid token')
      }

      const { email, name, sub, picture } = payload

      if (!email) {
        throw new Error('Invalid token')
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          googleId: sub,
        },
      })

      if (existingUser) {
        user = await prisma.user.update({
          where: {
            id: existingUser.id,
          },
          data: {
            name,
            googleAvatar: picture,
            ...(picture && picture !== existingUser.googleAvatar && { avatar: await uploadPicture(picture) }),
          },
        })
      } else {
        user = await prisma.user.create({
          data: {
            name,
            email,
            googleId: sub,
            googleAvatar: picture,
            ...(picture && { avatar: await uploadPicture(picture) }),
          },
        })
      }
    } catch (error) {
      console.error(error)
      throw new AuthenticationError('Invalid token')
    }
  }

  return { prisma, user }
}
