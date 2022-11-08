import { TaskResolvers } from '../../generated/graphql'

export const tags: TaskResolvers['tags'] = async (parent, args, { prisma }) => {
  const tagsOnTasks = await prisma.tagsOnTasks.findMany({
    where: {
      taskId: parent.id,
    },
    include: {
      tag: true,
    },
  })

  return tagsOnTasks.map(({ tag }) => tag.name)
}
