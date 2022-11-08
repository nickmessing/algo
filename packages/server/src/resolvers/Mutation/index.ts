import { MutationResolvers } from '../../generated/graphql'

import { createTask } from './createTask'
import { task } from './task'

export const Mutation: MutationResolvers = {
  createTask,
  task,
}
