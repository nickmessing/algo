import { SubscriptionResolvers } from '../../generated/graphql'
import { pubsub } from '../../utils/pubsub'
import { Publishers } from '../../utils/types'

const SUBSCRIPTION = 'runUpdated' as const
type SUBSCRIPTION = typeof SUBSCRIPTION

export const publishRunUpdated: Publishers[SUBSCRIPTION] = async ({ runId }, payload) => {
  await pubsub.publish(`${SUBSCRIPTION}.${runId}`, { [SUBSCRIPTION]: payload })
}

export const runUpdated: SubscriptionResolvers[SUBSCRIPTION] = {
  subscribe: (_, { runId }) => ({
    [Symbol.asyncIterator]() {
      return pubsub.asyncIterator(`${SUBSCRIPTION}.${runId}`)
    },
  }),
}
