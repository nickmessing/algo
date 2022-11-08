import { QueryResolvers } from '../../generated/graphql'

export const attempt: QueryResolvers['attempt'] = (_, { attemptId }, { prisma }) =>
  prisma.attempt.findUniqueOrThrow({ where: { id: attemptId } })
