import { SubscriptionResolvers } from '../../generated/graphql'

import { attemptCreated } from './attemptCreated'
import { attemptUpdated } from './attemptUpdated'
import { runUpdated } from './runUpdated'

export const Subscription: SubscriptionResolvers = {
  attemptCreated,
  attemptUpdated,
  runUpdated,
}
