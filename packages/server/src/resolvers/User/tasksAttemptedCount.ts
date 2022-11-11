import { AttemptStatus, UserResolvers } from '../../generated/graphql'

export const tasksAttemptedCount: UserResolvers['tasksAttemptedCount'] = async (parent, _, { prisma }) =>
  (
    await prisma.attempt.findMany({
      where: {
        userId: parent.id,
        status: {
          not: AttemptStatus.Processing,
        },
      },
      distinct: ['taskId'],
      select: {
        taskId: true,
      },
    })
  ).length
