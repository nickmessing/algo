import { TaskResolvers } from '../../generated/graphql'

export const author: TaskResolvers['author'] = async (parent, args, { prisma }) =>
  prisma.user.findUniqueOrThrow({ where: { id: parent.authorId } })
