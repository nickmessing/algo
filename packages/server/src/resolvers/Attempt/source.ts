import { AttemptStatus } from '@prisma/client'

import { AttemptResolvers } from '../../generated/graphql'

export const source: AttemptResolvers['source'] = async (parent, args, { prisma, user }) => {
  if (user == null) {
    return null
  }

  const currentUserAcceptedAttemptsCount = await prisma.attempt.count({
    where: {
      userId: user.id,
      taskId: parent.taskId,
      status: AttemptStatus.Accepted,
    },
  })

  if (currentUserAcceptedAttemptsCount === 0) {
    return null
  }

  return parent.code
}
