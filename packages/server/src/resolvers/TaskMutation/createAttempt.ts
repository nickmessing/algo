import { ForbiddenError } from 'apollo-server-errors'

import { TaskMutationResolvers } from '../../generated/graphql'

export const createAttempt: TaskMutationResolvers['createAttempt'] = async (parent, { input }, { prisma, user }) => {
  if (!user) {
    throw new ForbiddenError('Not authenticated')
  }

  return prisma.attempt.create({
    data: {
      taskId: parent.id,
      userId: user.id,
      languageId: input.languageId,
      code: input.sourceCode,
    },
  })
}
