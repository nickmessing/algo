import { AttemptResolvers } from '../../generated/graphql'

export const user: AttemptResolvers['user'] = (parent, args, { prisma }) =>
  prisma.user.findUniqueOrThrow({
    where: {
      id: parent.userId,
    },
  })
