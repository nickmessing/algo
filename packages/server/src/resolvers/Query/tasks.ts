import { QueryResolvers } from '../../generated/graphql'

export const tasks: QueryResolvers['tasks'] = (_, { pagination, filter }) => ({ pagination, filter })
