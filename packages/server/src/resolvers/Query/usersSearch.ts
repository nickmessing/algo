import { QueryResolvers } from '../../generated/graphql'

export const usersSearch: QueryResolvers['usersSearch'] = (_, { query }, { prisma }) =>
  prisma.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: query,
          },
        },
        {
          name: {
            contains: query,
          },
        },
      ],
    },
    take: 10,
  })
