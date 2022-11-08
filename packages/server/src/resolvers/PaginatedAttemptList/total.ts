import { PaginatedAttemptListResolvers } from '../../generated/graphql'

export const total: PaginatedAttemptListResolvers['total'] = async ({ task }, args, { prisma }) =>
  prisma.attempt.count({ where: { taskId: task.id } })
