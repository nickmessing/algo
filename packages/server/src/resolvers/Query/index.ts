import { QueryResolvers } from '../../generated/graphql'

import { attempt } from './attempt'
import { me } from './me'
import { tags } from './tags'
import { task } from './task'
import { tasks } from './tasks'
import { user } from './user'
import { users } from './users'
import { usersSearch } from './usersSearch'

export const Query: QueryResolvers = {
  me,
  tags,
  task,
  usersSearch,
  user,
  attempt,
  tasks,
  users,
}
