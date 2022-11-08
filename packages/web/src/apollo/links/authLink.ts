import { ApolloLink } from '@apollo/client/core'

import { googleTokenReference } from '@/composables/useGoogleToken'

export const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: googleTokenReference.value ? `Bearer ${googleTokenReference.value}` : '',
    },
  })
  return forward(operation)
})
