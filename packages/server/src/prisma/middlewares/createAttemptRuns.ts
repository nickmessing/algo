import { Attempt, PrismaClient } from '@prisma/client'

import { createAttemptRuns } from '../../utils/attempts'

export const connectCreateAttemptRuns = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    const result = (await next(params)) as unknown

    if (params.model === 'Attempt') {
      if (params.action === 'create') {
        const attempt = result as Attempt

        await createAttemptRuns(prisma, attempt)
      }
    }

    return result
  })
}
