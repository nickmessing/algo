import { TaskResolvers } from '../../generated/graphql'

import { attempts } from './attempts'
import { author } from './author'
import { examples } from './examples'
import { tags } from './tags'
import { usersAttemptedCount } from './usersAttemptedCount'
import { usersSuccededCount } from './usersSuccededCount'

export const Task: TaskResolvers = {
  author,
  tags,
  examples,
  usersAttemptedCount,
  usersSuccededCount,
  attempts,
}
