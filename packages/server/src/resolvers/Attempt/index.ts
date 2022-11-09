import { AttemptResolvers } from '../../generated/graphql'

import { runs } from './runs'
import { source } from './source'
import { user } from './user'

export const Attempt: AttemptResolvers = {
  user,
  runs,
  source,
}
