import { QueryResolvers } from '../../generated/graphql'

export const user: QueryResolvers['user'] = (_, { userId }, { prisma }) =>
  prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  })
