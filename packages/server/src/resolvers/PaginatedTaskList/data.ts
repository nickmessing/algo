import { PaginatedTaskListResolvers } from '../../generated/graphql'

export const data: PaginatedTaskListResolvers['data'] = ({ pagination, filter }, _, { prisma }) =>
  prisma.task.findMany({
    where: {
      ...(filter.search && {
        title: {
          contains: filter.search,
        },
      }),
      AND: filter.tags.map(tag => ({
        tags: {
          some: {
            tag: {
              name: tag,
            },
          },
        },
      })),
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: pagination?.skip ?? 0,
    take: Math.min(50, pagination?.take ?? 10),
  })
