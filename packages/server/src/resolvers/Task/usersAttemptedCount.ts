import { AttemptStatus } from '@prisma/client'

import { TaskResolvers } from '../../generated/graphql'

export const usersAttemptedCount: TaskResolvers['usersAttemptedCount'] = async (parent, args, { prisma }) =>
  (
    await prisma.attempt.findMany({
      where: {
        taskId: parent.id,
        status: {
          not: AttemptStatus.Processing,
        },
      },
      distinct: ['userId'],
      select: {
        userId: true,
      },
    })
  ).length
