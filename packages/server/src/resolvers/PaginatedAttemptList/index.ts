import { PaginatedAttemptListResolvers } from '../../generated/graphql'

import { data } from './data'
import { total } from './total'

export const PaginatedAttemptList: PaginatedAttemptListResolvers = {
  total,
  data,
}
