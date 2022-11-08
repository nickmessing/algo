import { QueryResolvers } from '../../generated/graphql'

export const tags: QueryResolvers['tags'] = async (parent, { search }, { prisma }) => {
  const list = search
    ? await prisma.tag.findMany({
        where: {
          name: {
            contains: search,
          },
        },
        take: 10,
      })
    : await prisma.tag.findMany({
        take: 10,
      })

  return list.map(tag => tag.name)
}
