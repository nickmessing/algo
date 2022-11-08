import { PaginatedTaskListResolvers } from '../../generated/graphql'

import { data } from './data'
import { total } from './total'

export const PaginatedTaskList: PaginatedTaskListResolvers = {
  data,
  total,
}
