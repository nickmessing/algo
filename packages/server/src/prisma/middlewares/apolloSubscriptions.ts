import { Attempt, PrismaClient, Run } from '@prisma/client'

import { publishAttemptCreated } from '../../resolvers/Subscription/attemptCreated'
import { publishAttemptUpdated } from '../../resolvers/Subscription/attemptUpdated'
import { publishRunUpdated } from '../../resolvers/Subscription/runUpdated'

export const connectApolloSubscriptions = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    const result = (await next(params)) as unknown

    if (params.model === 'Attempt') {
      if (params.action === 'create') {
        const attempt = result as Attempt

        await publishAttemptCreated({ taskId: attempt.taskId }, attempt)
      } else if (params.action === 'update') {
        const attempt = result as Attempt

        await publishAttemptUpdated({ attemptId: attempt.id }, attempt)
      }
    } else if (params.model === 'Run') {
      if (params.action === 'update') {
        const run = result as Run

        await publishRunUpdated({ runId: run.id }, run)
      }
    }

    return result
  })
}
