import { PaginatedAttemptListResolvers } from '../../generated/graphql'

export const data: PaginatedAttemptListResolvers['data'] = ({ task, pagination, userId }, args, { prisma }) =>
  prisma.attempt.findMany({
    where: { taskId: task.id, ...(userId && { userId }) },
    orderBy: { createdAt: 'desc' },
    skip: pagination?.skip ?? 0,
    take: Math.min(50, pagination?.take ?? 10),
  })
