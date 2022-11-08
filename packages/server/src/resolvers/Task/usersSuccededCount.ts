import { AttemptStatus } from '@prisma/client'

import { TaskResolvers } from '../../generated/graphql'

export const usersSuccededCount: TaskResolvers['usersSuccededCount'] = async (parent, args, { prisma }) =>
  (
    await prisma.attempt.findMany({
      where: {
        taskId: parent.id,
        status: AttemptStatus.Accepted,
      },
      distinct: ['userId'],
      select: {
        userId: true,
      },
    })
  ).length
