import { PrismaClient, Run } from '@prisma/client'

import { createRunSubmission } from '../../utils/attempts'

export const connectCreateRunSubmission = (prisma: PrismaClient) => {
  prisma.$use(async (params, next) => {
    const result = (await next(params)) as unknown

    if (params.model === 'Run') {
      if (params.action === 'create') {
        const run = result as Run

        await createRunSubmission(prisma, run)
      }
    }

    return result
  })
}
