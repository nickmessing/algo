import { TaskResolvers } from '../../generated/graphql'

export const attempts: TaskResolvers['attempts'] = (parent, { pagination, userId }) => ({
  task: parent,
  pagination,
  userId,
})
