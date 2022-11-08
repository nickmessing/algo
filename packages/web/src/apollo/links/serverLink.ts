import { split, HttpLink } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { watch } from 'vue'

import { googleTokenReference } from '@/composables/useGoogleToken'

const serverUrl = import.meta.env.VITE_SERVER_URL

const httpLink = new HttpLink({
  uri: serverUrl,
})

let restartRequestedBeforeConnected = false
let gracefullyRestart = () => {
  restartRequestedBeforeConnected = true
}

const wsClient = createClient({
  url: serverUrl.replace(/^http/, 'ws'),
  connectionParams: () => ({
    authorization: googleTokenReference.value,
  }),
  on: {
    connected: socket => {
      gracefullyRestart = () => {
        if (socket instanceof WebSocket) {
          if (socket.readyState === WebSocket.OPEN) {
            socket.close(4205, 'Client Restart')
          }
        }
      }

      if (restartRequestedBeforeConnected) {
        restartRequestedBeforeConnected = false
        gracefullyRestart()
      }
    },
  },
})

watch(googleTokenReference, gracefullyRestart)

const wsLink = new GraphQLWsLink(wsClient)

export const serverLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
)
