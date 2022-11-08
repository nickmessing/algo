import { QueryResolvers } from '../../generated/graphql'

export const me: QueryResolvers['me'] = (parent, args, { user }) => user
