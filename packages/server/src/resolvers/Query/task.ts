import { QueryResolvers } from '../../generated/graphql'

export const task: QueryResolvers['task'] = (parent, { taskId }, { prisma }) =>
  prisma.task.findUniqueOrThrow({
    where: {
      id: taskId,
    },
  })
