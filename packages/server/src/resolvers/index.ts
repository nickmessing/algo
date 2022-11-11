import { Resolvers } from '../generated/graphql'

import { Attempt } from './Attempt'
import { Mutation } from './Mutation'
import { PaginatedAttemptList } from './PaginatedAttemptList'
import { PaginatedTaskList } from './PaginatedTaskList'
import { PaginatedUserList } from './PaginatedUserList'
import { Query } from './Query'
import { Subscription } from './Subscription'
import { Task } from './Task'
import { TaskMutation } from './TaskMutation'

export const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,

  PaginatedAttemptList,
  PaginatedTaskList,
  PaginatedUserList,

  Attempt,
  Task,
  TaskMutation,
}
