import { onError } from '@apollo/client/link/error'

import { googleTokenReference } from '@/composables/useGoogleToken'

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      if (extensions?.code === 'UNAUTHENTICATED') {
        googleTokenReference.value = null
      }
      console.log('[GraphQL error]: Message: ', message, 'Location: ', locations, 'Path:', path)
    })
  if (networkError) console.log(`[Network error]:`, networkError)
})
