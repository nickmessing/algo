import { TaskResolvers } from '../../generated/graphql'

export const examples: TaskResolvers['examples'] = async (parent, args, { prisma }) =>
  prisma.example.findMany({ where: { taskId: parent.id } })
