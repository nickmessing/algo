import { readdir, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join } from 'node:path'

import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import express from 'express'
import { DateTimeTypeDefinition, DateTimeResolver } from 'graphql-scalars'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'

import { resolvers } from '../resolvers'
import { refreshRunSubmission } from '../utils/attempts'

import { createContext } from './createContext'
// import { handleWebhookCall } from './sphereWebhookHandler'

import type { PrismaClient } from '@prisma/client'

export async function createApollo(prisma: PrismaClient) {
  const files = await readdir(join(__dirname, '..', 'graphql'))
  const typeDefs = await Promise.all(
    files.map(async file => {
      const content = await readFile(join(__dirname, '..', 'graphql', file), 'utf8')
      return content
    }),
  )

  const schema = makeExecutableSchema({
    typeDefs: [DateTimeTypeDefinition, ...typeDefs],
    resolvers: {
      DateTime: DateTimeResolver,
      ...resolvers,
    },
  })

  const app = express()
  const httpServer = createServer(app)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  const serverCleanup = useServer({ schema, context: () => createContext({ token: null, prisma }) }, wsServer)
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        serverWillStart() {
          return Promise.resolve({
            async drainServer() {
              await serverCleanup.dispose()
            },
          })
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: ({ req }) =>
      createContext({
        token: req.headers.authorization?.startsWith('Bearer ')
          ? req.headers.authorization.replace('Bearer ', '')
          : null,
        prisma,
      }),
    formatError: error => {
      console.error(error)
      return error
    },
  })

  app.use(bodyParser.json({ limit: '50mb' }))

  app.put('/runs/:id/callback', (req, res) => {
    refreshRunSubmission(prisma, req.params.id).catch(e => console.error(e))

    res.send('OK')
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT ?? ''}${server.graphqlPath}`)
}
