import { SubscriptionResolvers } from '../../generated/graphql'
import { pubsub } from '../../utils/pubsub'
import { Publishers } from '../../utils/types'

const SUBSCRIPTION = 'attemptUpdated' as const
type SUBSCRIPTION = typeof SUBSCRIPTION

export const publishAttemptUpdated: Publishers[SUBSCRIPTION] = async ({ attemptId }, payload) => {
  await pubsub.publish(`${SUBSCRIPTION}.${attemptId}`, { [SUBSCRIPTION]: payload })
}

export const attemptUpdated: SubscriptionResolvers[SUBSCRIPTION] = {
  subscribe: (_, { attemptId }) => ({
    [Symbol.asyncIterator]() {
      return pubsub.asyncIterator(`${SUBSCRIPTION}.${attemptId}`)
    },
  }),
}
