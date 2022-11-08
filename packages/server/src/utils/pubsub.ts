import { RedisPubSub } from 'graphql-redis-subscriptions'
export const pubsub = new RedisPubSub({
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  }
})
