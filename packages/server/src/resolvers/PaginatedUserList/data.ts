import { PaginatedUserListResolvers } from '../../generated/graphql'

export const data: PaginatedUserListResolvers['data'] = ({ pagination, filter }, _, { prisma }) =>
  prisma.user.findMany({
    where: {
      ...(filter.search && {
        OR: [
          {
            email: {
              contains: filter.search,
            },
          },
          {
            name: {
              contains: filter.search,
            },
          },
        ],
      }),
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: pagination?.skip ?? 0,
    take: Math.min(50, pagination?.take ?? 10),
  })
