/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { GraphQLResolveInfo } from 'graphql'

import { SubscriptionResolver, SubscriptionResolvers } from '../generated/graphql'

export type ObjectKeys<T extends object> = {
  [P in keyof T]: Exclude<T[P], undefined | null> extends object ? P : never
}[keyof T]
export type PrimitiveKeys<T extends object> = Exclude<keyof T, ObjectKeys<T>>
export type OptionalPrimitiveKeys<T extends object> = {
  [P in PrimitiveKeys<T>]: undefined extends T[P] ? P : never
}[PrimitiveKeys<T>]
export type RequiredPrimitiveKeys<T extends object> = Exclude<PrimitiveKeys<T>, OptionalPrimitiveKeys<T>>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionPayloadType<T> = T extends SubscriptionResolver<infer Payload, any, any, any, any>
  ? Payload
  : never
export type SubscriptionArgsType<T> = T extends SubscriptionResolver<any, any, any, any, infer Args> ? Args : never
export type Publishers = {
  [Key in keyof Required<SubscriptionResolvers>]: {} extends SubscriptionArgsType<SubscriptionResolvers[Key]>
    ? (payload: SubscriptionPayloadType<SubscriptionResolvers[Key]>) => Promise<void>
    : (
        args: SubscriptionArgsType<SubscriptionResolvers[Key]>,
        payload: SubscriptionPayloadType<SubscriptionResolvers[Key]>,
      ) => Promise<void>
}
