import { AttemptResolvers } from '../../generated/graphql'

import { runs } from './runs'
import { user } from './user'

export const Attempt: AttemptResolvers = {
  user,
  runs,
}
