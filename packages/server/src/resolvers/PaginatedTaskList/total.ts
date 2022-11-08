import { PaginatedTaskListResolvers } from '../../generated/graphql'

export const total: PaginatedTaskListResolvers['total'] = ({ filter }, _, { prisma }) =>
  prisma.task.count({
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
  })
