/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'

import { ApolloContext } from '../apollo/createContext'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: Date
}

export type Attempt = BaseModel & {
  __typename?: 'Attempt'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  languageId: Scalars['Int']
  runs: Array<Run>
  source?: Maybe<Scalars['String']>
  status: AttemptStatus
  updatedAt: Scalars['DateTime']
  user: User
}

export const AttemptStatus = {
  Accepted: 'Accepted',
  Error: 'Error',
  Processing: 'Processing',
} as const

export type AttemptStatus = typeof AttemptStatus[keyof typeof AttemptStatus]
export type BaseModel = {
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  updatedAt: Scalars['DateTime']
}

export type CreateAttemptInput = {
  languageId: Scalars['Int']
  sourceCode: Scalars['String']
}

export type CreateExampleInput = {
  input: Scalars['String']
  output: Scalars['String']
}

export type CreateTaskInput = {
  description: Scalars['String']
  examples: Array<CreateExampleInput>
  inputs: Array<Scalars['String']>
  languageId: Scalars['Int']
  memoryLimit: Scalars['Int']
  solutionSource: Scalars['String']
  tags: Array<Scalars['String']>
  timeLimit: Scalars['Int']
  title: Scalars['String']
}

export type Example = BaseModel & {
  __typename?: 'Example'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  input: Scalars['String']
  output: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type Mutation = {
  __typename?: 'Mutation'
  createTask: Task
  task: TaskMutation
}

export type MutationCreateTaskArgs = {
  input: CreateTaskInput
}

export type MutationTaskArgs = {
  taskId: Scalars['ID']
}

export type PaginatedAttemptList = PaginatedResult & {
  __typename?: 'PaginatedAttemptList'
  data: Array<Attempt>
  total: Scalars['Int']
}

export type PaginatedResult = {
  data: Array<BaseModel>
  total: Scalars['Int']
}

export type PaginatedTaskList = PaginatedResult & {
  __typename?: 'PaginatedTaskList'
  data: Array<Task>
  total: Scalars['Int']
}

export type Pagination = {
  skip: Scalars['Int']
  take: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  attempt: Attempt
  me?: Maybe<User>
  tags: Array<Scalars['String']>
  task: Task
  tasks: PaginatedTaskList
  user: User
  usersSearch: Array<User>
}

export type QueryAttemptArgs = {
  attemptId: Scalars['ID']
}

export type QueryTagsArgs = {
  search?: InputMaybe<Scalars['String']>
}

export type QueryTaskArgs = {
  taskId: Scalars['ID']
}

export type QueryTasksArgs = {
  filter: TaskListFilter
  pagination?: InputMaybe<Pagination>
}

export type QueryUserArgs = {
  userId: Scalars['ID']
}

export type QueryUsersSearchArgs = {
  query: Scalars['String']
}

export type Run = BaseModel & {
  __typename?: 'Run'
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  memory?: Maybe<Scalars['Int']>
  status: RunStatus
  time?: Maybe<Scalars['Int']>
  updatedAt: Scalars['DateTime']
}

export const RunStatus = {
  Accepted: 'Accepted',
  CompilationError: 'CompilationError',
  ExecFormatError: 'ExecFormatError',
  InQueue: 'InQueue',
  InternalError: 'InternalError',
  Pending: 'Pending',
  Processing: 'Processing',
  RuntimeErrorNzec: 'RuntimeErrorNzec',
  RuntimeErrorOther: 'RuntimeErrorOther',
  RuntimeErrorSigabrt: 'RuntimeErrorSigabrt',
  RuntimeErrorSigfpe: 'RuntimeErrorSigfpe',
  RuntimeErrorSigsegv: 'RuntimeErrorSigsegv',
  RuntimeErrorSigxfsz: 'RuntimeErrorSigxfsz',
  TimeLimitExceeded: 'TimeLimitExceeded',
  WrongAnswer: 'WrongAnswer',
} as const

export type RunStatus = typeof RunStatus[keyof typeof RunStatus]
export type Subscription = {
  __typename?: 'Subscription'
  attemptCreated: Attempt
  attemptUpdated: Attempt
  runUpdated: Run
}

export type SubscriptionAttemptCreatedArgs = {
  taskId: Scalars['ID']
}

export type SubscriptionAttemptUpdatedArgs = {
  attemptId: Scalars['ID']
}

export type SubscriptionRunUpdatedArgs = {
  runId: Scalars['ID']
}

export type Task = BaseModel & {
  __typename?: 'Task'
  attempt: Attempt
  attempts: PaginatedAttemptList
  author: User
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  examples: Array<Example>
  id: Scalars['ID']
  isActive: Scalars['Boolean']
  memoryLimit: Scalars['Int']
  tags: Array<Scalars['String']>
  timeLimit: Scalars['Int']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
  usersAttemptedCount: Scalars['Int']
  usersSuccededCount: Scalars['Int']
}

export type TaskAttemptArgs = {
  attemptId: Scalars['ID']
}

export type TaskAttemptsArgs = {
  pagination?: InputMaybe<Pagination>
  userId?: InputMaybe<Scalars['String']>
}

export type TaskListFilter = {
  search: Scalars['String']
  tags: Array<Scalars['String']>
}

export type TaskMutation = {
  __typename?: 'TaskMutation'
  createAttempt: Attempt
}

export type TaskMutationCreateAttemptArgs = {
  input: CreateAttemptInput
}

export type User = BaseModel & {
  __typename?: 'User'
  avatar?: Maybe<Scalars['String']>
  canCreateTasks: Scalars['Boolean']
  canUpdateForeignTasks: Scalars['Boolean']
  canUpdateUsers: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  tasksAttemptedCount: Scalars['Int']
  tasksSolvedCount: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Attempt: ResolverTypeWrapper<import('@prisma/client').Attempt>
  AttemptStatus: AttemptStatus
  BaseModel:
    | ResolversTypes['Attempt']
    | ResolversTypes['Example']
    | ResolversTypes['Run']
    | ResolversTypes['Task']
    | ResolversTypes['User']
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CreateAttemptInput: CreateAttemptInput
  CreateExampleInput: CreateExampleInput
  CreateTaskInput: CreateTaskInput
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  Example: ResolverTypeWrapper<Example>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  PaginatedAttemptList: ResolverTypeWrapper<import('../utils/apollo').PaginatedAttemptListContext>
  PaginatedResult: ResolversTypes['PaginatedAttemptList'] | ResolversTypes['PaginatedTaskList']
  PaginatedTaskList: ResolverTypeWrapper<import('../utils/apollo').PaginatedTaskListContext>
  Pagination: Pagination
  Query: ResolverTypeWrapper<{}>
  Run: ResolverTypeWrapper<Run>
  RunStatus: RunStatus
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  Task: ResolverTypeWrapper<import('@prisma/client').Task>
  TaskListFilter: TaskListFilter
  TaskMutation: ResolverTypeWrapper<import('@prisma/client').Task>
  User: ResolverTypeWrapper<import('@prisma/client').User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Attempt: import('@prisma/client').Attempt
  BaseModel:
    | ResolversParentTypes['Attempt']
    | ResolversParentTypes['Example']
    | ResolversParentTypes['Run']
    | ResolversParentTypes['Task']
    | ResolversParentTypes['User']
  Boolean: Scalars['Boolean']
  CreateAttemptInput: CreateAttemptInput
  CreateExampleInput: CreateExampleInput
  CreateTaskInput: CreateTaskInput
  DateTime: Scalars['DateTime']
  Example: Example
  ID: Scalars['ID']
  Int: Scalars['Int']
  Mutation: {}
  PaginatedAttemptList: import('../utils/apollo').PaginatedAttemptListContext
  PaginatedResult: ResolversParentTypes['PaginatedAttemptList'] | ResolversParentTypes['PaginatedTaskList']
  PaginatedTaskList: import('../utils/apollo').PaginatedTaskListContext
  Pagination: Pagination
  Query: {}
  Run: Run
  String: Scalars['String']
  Subscription: {}
  Task: import('@prisma/client').Task
  TaskListFilter: TaskListFilter
  TaskMutation: import('@prisma/client').Task
  User: import('@prisma/client').User
}

export type AttemptResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['Attempt']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  languageId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  runs?: Resolver<Array<ResolversTypes['Run']>, ParentType, ContextType>
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['AttemptStatus'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type BaseModelResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['BaseModel']> = {
  __resolveType: TypeResolveFn<'Attempt' | 'Example' | 'Run' | 'Task' | 'User', ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type ExampleResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['Example']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  input?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  output?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['Mutation']> = {
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>
  task?: Resolver<ResolversTypes['TaskMutation'], ParentType, ContextType, RequireFields<MutationTaskArgs, 'taskId'>>
}

export type PaginatedAttemptListResolvers<
  ContextType = ApolloContext,
  ParentType = ResolversParentTypes['PaginatedAttemptList'],
> = {
  data?: Resolver<Array<ResolversTypes['Attempt']>, ParentType, ContextType>
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PaginatedResultResolvers<
  ContextType = ApolloContext,
  ParentType = ResolversParentTypes['PaginatedResult'],
> = {
  __resolveType: TypeResolveFn<'PaginatedAttemptList' | 'PaginatedTaskList', ParentType, ContextType>
  data?: Resolver<Array<ResolversTypes['BaseModel']>, ParentType, ContextType>
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
}

export type PaginatedTaskListResolvers<
  ContextType = ApolloContext,
  ParentType = ResolversParentTypes['PaginatedTaskList'],
> = {
  data?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['Query']> = {
  attempt?: Resolver<ResolversTypes['Attempt'], ParentType, ContextType, RequireFields<QueryAttemptArgs, 'attemptId'>>
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, Partial<QueryTagsArgs>>
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<QueryTaskArgs, 'taskId'>>
  tasks?: Resolver<
    ResolversTypes['PaginatedTaskList'],
    ParentType,
    ContextType,
    RequireFields<QueryTasksArgs, 'filter'>
  >
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'userId'>>
  usersSearch?: Resolver<
    Array<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUsersSearchArgs, 'query'>
  >
}

export type RunResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['Run']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  memory?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  status?: Resolver<ResolversTypes['RunStatus'], ParentType, ContextType>
  time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['Subscription']> = {
  attemptCreated?: SubscriptionResolver<
    ResolversTypes['Attempt'],
    'attemptCreated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionAttemptCreatedArgs, 'taskId'>
  >
  attemptUpdated?: SubscriptionResolver<
    ResolversTypes['Attempt'],
    'attemptUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionAttemptUpdatedArgs, 'attemptId'>
  >
  runUpdated?: SubscriptionResolver<
    ResolversTypes['Run'],
    'runUpdated',
    ParentType,
    ContextType,
    RequireFields<SubscriptionRunUpdatedArgs, 'runId'>
  >
}

export type TaskResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['Task']> = {
  attempt?: Resolver<ResolversTypes['Attempt'], ParentType, ContextType, RequireFields<TaskAttemptArgs, 'attemptId'>>
  attempts?: Resolver<ResolversTypes['PaginatedAttemptList'], ParentType, ContextType, Partial<TaskAttemptsArgs>>
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  examples?: Resolver<Array<ResolversTypes['Example']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  memoryLimit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>
  timeLimit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  usersAttemptedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  usersSuccededCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TaskMutationResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['TaskMutation']> = {
  createAttempt?: Resolver<
    ResolversTypes['Attempt'],
    ParentType,
    ContextType,
    RequireFields<TaskMutationCreateAttemptArgs, 'input'>
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<ContextType = ApolloContext, ParentType = ResolversParentTypes['User']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  canCreateTasks?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  canUpdateForeignTasks?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  canUpdateUsers?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  tasksAttemptedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  tasksSolvedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = ApolloContext> = {
  Attempt?: AttemptResolvers<ContextType>
  BaseModel?: BaseModelResolvers<ContextType>
  DateTime?: GraphQLScalarType
  Example?: ExampleResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  PaginatedAttemptList?: PaginatedAttemptListResolvers<ContextType>
  PaginatedResult?: PaginatedResultResolvers<ContextType>
  PaginatedTaskList?: PaginatedTaskListResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Run?: RunResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  Task?: TaskResolvers<ContextType>
  TaskMutation?: TaskMutationResolvers<ContextType>
  User?: UserResolvers<ContextType>
}
