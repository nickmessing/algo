import { PaginatedUserListResolvers } from '../../generated/graphql'

import { data } from './data'
import { total } from './total'

export const PaginatedUserList: PaginatedUserListResolvers = {
  data,
  total,
}
