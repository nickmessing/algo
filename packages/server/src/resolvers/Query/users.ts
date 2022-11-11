import { QueryResolvers } from '../../generated/graphql'

export const users: QueryResolvers['users'] = (_, { pagination, filter }) => ({ pagination, filter })
