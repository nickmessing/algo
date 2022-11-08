import { PrismaClient } from '@prisma/client'

import { connectApolloSubscriptions } from './middlewares/apolloSubscriptions'
import { connectCreateAttemptRuns } from './middlewares/createAttemptRuns'
import { connectCreateRunSubmission } from './middlewares/createRunSubmission'
import { connectUpdateAttemptStatus } from './middlewares/updateAttemptStatus'

export const createPrisma = () => {
  const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
  })

  connectCreateAttemptRuns(prisma)
  connectCreateRunSubmission(prisma)
  connectUpdateAttemptStatus(prisma)
  connectApolloSubscriptions(prisma)

  return prisma
}
