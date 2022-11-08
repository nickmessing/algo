import { ApolloClient } from '@apollo/client/core'

import { cache } from './cache'
import { authLink } from './links/authLink'
import { errorLink } from './links/errorLink'
import { serverLink } from './links/serverLink'

export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(serverLink)),
  cache,
  connectToDevTools: true,
})
