import { AttemptStatus, UserResolvers } from '../../generated/graphql'

export const tasksSuccededCount: UserResolvers['tasksSuccededCount'] = async (parent, _, { prisma }) =>
  (
    await prisma.attempt.findMany({
      where: {
        userId: parent.id,
        status: AttemptStatus.Accepted,
      },
      distinct: ['taskId'],
      select: {
        taskId: true,
      },
    })
  ).length
