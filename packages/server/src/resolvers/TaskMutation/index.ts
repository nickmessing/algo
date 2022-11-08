import { TaskMutationResolvers } from '../../generated/graphql'

import { createAttempt } from './createAttempt'

export const TaskMutation: TaskMutationResolvers = {
  createAttempt,
}
