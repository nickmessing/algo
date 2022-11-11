import { PaginatedUserListResolvers } from '../../generated/graphql'

export const total: PaginatedUserListResolvers['total'] = ({ filter }, _, { prisma }) =>
  prisma.user.count({
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
  })
