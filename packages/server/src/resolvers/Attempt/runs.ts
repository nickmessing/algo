import { AttemptResolvers } from '../../generated/graphql'

export const runs: AttemptResolvers['runs'] = (parent, args, { prisma }) =>
  prisma.run.findMany({
    where: {
      attemptId: parent.id,
    },
  })
