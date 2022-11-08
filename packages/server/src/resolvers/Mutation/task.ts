import { MutationResolvers } from '../../generated/graphql'

export const task: MutationResolvers['task'] = (parent, { taskId }, { prisma }) =>
  prisma.task.findUniqueOrThrow({ where: { id: taskId } })
