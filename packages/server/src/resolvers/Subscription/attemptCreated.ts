import { SubscriptionResolvers } from '../../generated/graphql'
import { pubsub } from '../../utils/pubsub'
import { Publishers } from '../../utils/types'

const SUBSCRIPTION = 'attemptCreated' as const
type SUBSCRIPTION = typeof SUBSCRIPTION

export const publishAttemptCreated: Publishers[SUBSCRIPTION] = async ({ taskId }, payload) => {
  await pubsub.publish(`${SUBSCRIPTION}.${taskId}`, { [SUBSCRIPTION]: payload })
}

export const attemptCreated: SubscriptionResolvers[SUBSCRIPTION] = {
  subscribe: (_, { taskId }) => ({
    [Symbol.asyncIterator]() {
      return pubsub.asyncIterator(`${SUBSCRIPTION}.${taskId}`)
    },
  }),
}
