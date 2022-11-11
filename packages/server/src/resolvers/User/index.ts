import { UserResolvers } from '../../generated/graphql'

import { tasksAttemptedCount } from './tasksAttemptedCount'
import { tasksSuccededCount } from './tasksSuccededCount'

export const User: UserResolvers = {
  tasksAttemptedCount,
  tasksSuccededCount,
}
