import * as VueApolloComposable from '@vue/apollo-composable'
import gql from 'graphql-tag'

import type * as VueCompositionApi from 'vue'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type ReactiveFunction<TParam> = () => TParam
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
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

export type RunBasicFragment = {
  __typename?: 'Run'
  id: string
  status: RunStatus
  time?: number | null
  memory?: number | null
}

export type AttemptRunsQueryVariables = Exact<{
  attemptId: Scalars['ID']
}>

export type AttemptRunsQuery = {
  __typename?: 'Query'
  attempt: {
    __typename?: 'Attempt'
    id: string
    runs: Array<{ __typename?: 'Run'; id: string; status: RunStatus; time?: number | null; memory?: number | null }>
  }
}

export type AttemptUpdatedSubscriptionVariables = Exact<{
  attemptId: Scalars['ID']
}>

export type AttemptUpdatedSubscription = {
  __typename?: 'Subscription'
  attemptUpdated: {
    __typename?: 'Attempt'
    id: string
    status: AttemptStatus
    createdAt: string
    languageId: number
    source?: string | null
    user: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
  }
}

export type RunUpdatedSubscriptionVariables = Exact<{
  runId: Scalars['ID']
}>

export type RunUpdatedSubscription = {
  __typename?: 'Subscription'
  runUpdated: { __typename?: 'Run'; id: string; status: RunStatus; time?: number | null; memory?: number | null }
}

export type TagsQueryVariables = Exact<{
  search: Scalars['String']
}>

export type TagsQuery = { __typename?: 'Query'; tags: Array<string> }

export type BasicTaskFragment = {
  __typename?: 'Task'
  id: string
  title: string
  createdAt: string
  tags: Array<string>
  usersAttemptedCount: number
  usersSuccededCount: number
  author: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
}

export type FullTaskFragment = {
  __typename?: 'Task'
  description: string
  timeLimit: number
  memoryLimit: number
  isActive: boolean
  id: string
  title: string
  createdAt: string
  tags: Array<string>
  usersAttemptedCount: number
  usersSuccededCount: number
  examples: Array<{ __typename?: 'Example'; id: string; input: string; output: string }>
  attempts: { __typename?: 'PaginatedAttemptList'; total: number }
  author: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
}

export type TaskAttemptFragment = {
  __typename?: 'Attempt'
  id: string
  status: AttemptStatus
  createdAt: string
  languageId: number
  source?: string | null
  user: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
}

export type SingleTaskQueryVariables = Exact<{
  taskId: Scalars['ID']
}>

export type SingleTaskQuery = {
  __typename?: 'Query'
  task: {
    __typename?: 'Task'
    description: string
    timeLimit: number
    memoryLimit: number
    isActive: boolean
    id: string
    title: string
    createdAt: string
    tags: Array<string>
    usersAttemptedCount: number
    usersSuccededCount: number
    examples: Array<{ __typename?: 'Example'; id: string; input: string; output: string }>
    attempts: { __typename?: 'PaginatedAttemptList'; total: number }
    author: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
  }
}

export type TaskAttemptsQueryVariables = Exact<{
  taskId: Scalars['ID']
  pagination: Pagination
  userId?: InputMaybe<Scalars['String']>
}>

export type TaskAttemptsQuery = {
  __typename?: 'Query'
  task: {
    __typename?: 'Task'
    id: string
    attempts: {
      __typename?: 'PaginatedAttemptList'
      data: Array<{
        __typename?: 'Attempt'
        id: string
        status: AttemptStatus
        createdAt: string
        languageId: number
        source?: string | null
        user: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
      }>
    }
  }
}

export type TaskAttemptsTotalQueryVariables = Exact<{
  taskId: Scalars['ID']
  userId?: InputMaybe<Scalars['String']>
}>

export type TaskAttemptsTotalQuery = {
  __typename?: 'Query'
  task: { __typename?: 'Task'; id: string; attempts: { __typename?: 'PaginatedAttemptList'; total: number } }
}

export type TaskAttemptCreatedSubscriptionVariables = Exact<{
  taskId: Scalars['ID']
}>

export type TaskAttemptCreatedSubscription = {
  __typename?: 'Subscription'
  attemptCreated: {
    __typename?: 'Attempt'
    id: string
    status: AttemptStatus
    createdAt: string
    languageId: number
    source?: string | null
    user: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
  }
}

export type TaskListTotalQueryVariables = Exact<{
  filter: TaskListFilter
}>

export type TaskListTotalQuery = { __typename?: 'Query'; tasks: { __typename?: 'PaginatedTaskList'; total: number } }

export type TaskListQueryVariables = Exact<{
  pagination: Pagination
  filter: TaskListFilter
}>

export type TaskListQuery = {
  __typename?: 'Query'
  tasks: {
    __typename?: 'PaginatedTaskList'
    data: Array<{
      __typename?: 'Task'
      id: string
      title: string
      createdAt: string
      tags: Array<string>
      usersAttemptedCount: number
      usersSuccededCount: number
      author: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
    }>
  }
}

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput
}>

export type CreateTaskMutation = { __typename?: 'Mutation'; createTask: { __typename?: 'Task'; id: string } }

export type CreateTaskAttemptMutationVariables = Exact<{
  taskId: Scalars['ID']
  input: CreateAttemptInput
}>

export type CreateTaskAttemptMutation = {
  __typename?: 'Mutation'
  task: { __typename?: 'TaskMutation'; createAttempt: { __typename?: 'Attempt'; id: string } }
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    id: string
    name?: string | null
    email: string
    avatar?: string | null
    canCreateTasks: boolean
  } | null
}

export type UsersSearchQueryVariables = Exact<{
  query: Scalars['String']
}>

export type UsersSearchQuery = {
  __typename?: 'Query'
  usersSearch: Array<{ __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }>
}

export type UserQueryVariables = Exact<{
  userId: Scalars['ID']
}>

export type UserQuery = {
  __typename?: 'Query'
  user: { __typename?: 'User'; id: string; name?: string | null; email: string; avatar?: string | null }
}

export const RunBasicFragmentDoc = gql`
  fragment RunBasic on Run {
    id
    status
    time
    memory
  }
`
export const BasicTaskFragmentDoc = gql`
  fragment BasicTask on Task {
    id
    title
    createdAt
    tags
    usersAttemptedCount
    usersSuccededCount
    author {
      id
      name
      email
      avatar
    }
  }
`
export const FullTaskFragmentDoc = gql`
  fragment FullTask on Task {
    ...BasicTask
    description
    timeLimit
    memoryLimit
    isActive
    examples {
      id
      input
      output
    }
    attempts {
      total
    }
  }
  ${BasicTaskFragmentDoc}
`
export const TaskAttemptFragmentDoc = gql`
  fragment TaskAttempt on Attempt {
    id
    status
    createdAt
    languageId
    source
    user {
      id
      name
      email
      avatar
    }
  }
`
export const AttemptRunsDocument = gql`
  query AttemptRuns($attemptId: ID!) {
    attempt(attemptId: $attemptId) {
      id
      runs {
        ...RunBasic
      }
    }
  }
  ${RunBasicFragmentDoc}
`

/**
 * __useAttemptRunsQuery__
 *
 * To run a query within a Vue component, call `useAttemptRunsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttemptRunsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAttemptRunsQuery({
 *   attemptId: // value for 'attemptId'
 * });
 */
export function useAttemptRunsQuery(
  variables:
    | AttemptRunsQueryVariables
    | VueCompositionApi.Ref<AttemptRunsQueryVariables>
    | ReactiveFunction<AttemptRunsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<AttemptRunsQuery, AttemptRunsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AttemptRunsQuery, AttemptRunsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<AttemptRunsQuery, AttemptRunsQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<AttemptRunsQuery, AttemptRunsQueryVariables>(
    AttemptRunsDocument,
    variables,
    options,
  )
}
export function useAttemptRunsLazyQuery(
  variables:
    | AttemptRunsQueryVariables
    | VueCompositionApi.Ref<AttemptRunsQueryVariables>
    | ReactiveFunction<AttemptRunsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<AttemptRunsQuery, AttemptRunsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AttemptRunsQuery, AttemptRunsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<AttemptRunsQuery, AttemptRunsQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<AttemptRunsQuery, AttemptRunsQueryVariables>(
    AttemptRunsDocument,
    variables,
    options,
  )
}
export type AttemptRunsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  AttemptRunsQuery,
  AttemptRunsQueryVariables
>
export const AttemptUpdatedDocument = gql`
  subscription AttemptUpdated($attemptId: ID!) {
    attemptUpdated(attemptId: $attemptId) {
      ...TaskAttempt
    }
  }
  ${TaskAttemptFragmentDoc}
`

/**
 * __useAttemptUpdatedSubscription__
 *
 * To run a query within a Vue component, call `useAttemptUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAttemptUpdatedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useAttemptUpdatedSubscription({
 *   attemptId: // value for 'attemptId'
 * });
 */
export function useAttemptUpdatedSubscription(
  variables:
    | AttemptUpdatedSubscriptionVariables
    | VueCompositionApi.Ref<AttemptUpdatedSubscriptionVariables>
    | ReactiveFunction<AttemptUpdatedSubscriptionVariables>,
  options:
    | VueApolloComposable.UseSubscriptionOptions<AttemptUpdatedSubscription, AttemptUpdatedSubscriptionVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseSubscriptionOptions<AttemptUpdatedSubscription, AttemptUpdatedSubscriptionVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseSubscriptionOptions<AttemptUpdatedSubscription, AttemptUpdatedSubscriptionVariables>
      > = {},
) {
  return VueApolloComposable.useSubscription<AttemptUpdatedSubscription, AttemptUpdatedSubscriptionVariables>(
    AttemptUpdatedDocument,
    variables,
    options,
  )
}
export type AttemptUpdatedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<
  AttemptUpdatedSubscription,
  AttemptUpdatedSubscriptionVariables
>
export const RunUpdatedDocument = gql`
  subscription RunUpdated($runId: ID!) {
    runUpdated(runId: $runId) {
      ...RunBasic
    }
  }
  ${RunBasicFragmentDoc}
`

/**
 * __useRunUpdatedSubscription__
 *
 * To run a query within a Vue component, call `useRunUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRunUpdatedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useRunUpdatedSubscription({
 *   runId: // value for 'runId'
 * });
 */
export function useRunUpdatedSubscription(
  variables:
    | RunUpdatedSubscriptionVariables
    | VueCompositionApi.Ref<RunUpdatedSubscriptionVariables>
    | ReactiveFunction<RunUpdatedSubscriptionVariables>,
  options:
    | VueApolloComposable.UseSubscriptionOptions<RunUpdatedSubscription, RunUpdatedSubscriptionVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseSubscriptionOptions<RunUpdatedSubscription, RunUpdatedSubscriptionVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseSubscriptionOptions<RunUpdatedSubscription, RunUpdatedSubscriptionVariables>
      > = {},
) {
  return VueApolloComposable.useSubscription<RunUpdatedSubscription, RunUpdatedSubscriptionVariables>(
    RunUpdatedDocument,
    variables,
    options,
  )
}
export type RunUpdatedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<
  RunUpdatedSubscription,
  RunUpdatedSubscriptionVariables
>
export const TagsDocument = gql`
  query Tags($search: String!) {
    tags(search: $search)
  }
`

/**
 * __useTagsQuery__
 *
 * To run a query within a Vue component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTagsQuery({
 *   search: // value for 'search'
 * });
 */
export function useTagsQuery(
  variables: TagsQueryVariables | VueCompositionApi.Ref<TagsQueryVariables> | ReactiveFunction<TagsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TagsQuery, TagsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TagsQuery, TagsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TagsQuery, TagsQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, variables, options)
}
export function useTagsLazyQuery(
  variables: TagsQueryVariables | VueCompositionApi.Ref<TagsQueryVariables> | ReactiveFunction<TagsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TagsQuery, TagsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TagsQuery, TagsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TagsQuery, TagsQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, variables, options)
}
export type TagsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<TagsQuery, TagsQueryVariables>
export const SingleTaskDocument = gql`
  query SingleTask($taskId: ID!) {
    task(taskId: $taskId) {
      ...FullTask
    }
  }
  ${FullTaskFragmentDoc}
`

/**
 * __useSingleTaskQuery__
 *
 * To run a query within a Vue component, call `useSingleTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleTaskQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSingleTaskQuery({
 *   taskId: // value for 'taskId'
 * });
 */
export function useSingleTaskQuery(
  variables:
    | SingleTaskQueryVariables
    | VueCompositionApi.Ref<SingleTaskQueryVariables>
    | ReactiveFunction<SingleTaskQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<SingleTaskQuery, SingleTaskQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SingleTaskQuery, SingleTaskQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<SingleTaskQuery, SingleTaskQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<SingleTaskQuery, SingleTaskQueryVariables>(SingleTaskDocument, variables, options)
}
export function useSingleTaskLazyQuery(
  variables:
    | SingleTaskQueryVariables
    | VueCompositionApi.Ref<SingleTaskQueryVariables>
    | ReactiveFunction<SingleTaskQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<SingleTaskQuery, SingleTaskQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SingleTaskQuery, SingleTaskQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<SingleTaskQuery, SingleTaskQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<SingleTaskQuery, SingleTaskQueryVariables>(
    SingleTaskDocument,
    variables,
    options,
  )
}
export type SingleTaskQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  SingleTaskQuery,
  SingleTaskQueryVariables
>
export const TaskAttemptsDocument = gql`
  query TaskAttempts($taskId: ID!, $pagination: Pagination!, $userId: String) {
    task(taskId: $taskId) {
      id
      attempts(userId: $userId, pagination: $pagination) {
        data {
          ...TaskAttempt
        }
      }
    }
  }
  ${TaskAttemptFragmentDoc}
`

/**
 * __useTaskAttemptsQuery__
 *
 * To run a query within a Vue component, call `useTaskAttemptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskAttemptsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTaskAttemptsQuery({
 *   taskId: // value for 'taskId'
 *   pagination: // value for 'pagination'
 *   userId: // value for 'userId'
 * });
 */
export function useTaskAttemptsQuery(
  variables:
    | TaskAttemptsQueryVariables
    | VueCompositionApi.Ref<TaskAttemptsQueryVariables>
    | ReactiveFunction<TaskAttemptsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskAttemptsQuery, TaskAttemptsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TaskAttemptsQuery, TaskAttemptsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TaskAttemptsQuery, TaskAttemptsQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<TaskAttemptsQuery, TaskAttemptsQueryVariables>(
    TaskAttemptsDocument,
    variables,
    options,
  )
}
export function useTaskAttemptsLazyQuery(
  variables:
    | TaskAttemptsQueryVariables
    | VueCompositionApi.Ref<TaskAttemptsQueryVariables>
    | ReactiveFunction<TaskAttemptsQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskAttemptsQuery, TaskAttemptsQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TaskAttemptsQuery, TaskAttemptsQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TaskAttemptsQuery, TaskAttemptsQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<TaskAttemptsQuery, TaskAttemptsQueryVariables>(
    TaskAttemptsDocument,
    variables,
    options,
  )
}
export type TaskAttemptsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  TaskAttemptsQuery,
  TaskAttemptsQueryVariables
>
export const TaskAttemptsTotalDocument = gql`
  query TaskAttemptsTotal($taskId: ID!, $userId: String) {
    task(taskId: $taskId) {
      id
      attempts(userId: $userId) {
        total
      }
    }
  }
`

/**
 * __useTaskAttemptsTotalQuery__
 *
 * To run a query within a Vue component, call `useTaskAttemptsTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskAttemptsTotalQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTaskAttemptsTotalQuery({
 *   taskId: // value for 'taskId'
 *   userId: // value for 'userId'
 * });
 */
export function useTaskAttemptsTotalQuery(
  variables:
    | TaskAttemptsTotalQueryVariables
    | VueCompositionApi.Ref<TaskAttemptsTotalQueryVariables>
    | ReactiveFunction<TaskAttemptsTotalQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>
      > = {},
) {
  return VueApolloComposable.useQuery<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>(
    TaskAttemptsTotalDocument,
    variables,
    options,
  )
}
export function useTaskAttemptsTotalLazyQuery(
  variables:
    | TaskAttemptsTotalQueryVariables
    | VueCompositionApi.Ref<TaskAttemptsTotalQueryVariables>
    | ReactiveFunction<TaskAttemptsTotalQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>
      > = {},
) {
  return VueApolloComposable.useLazyQuery<TaskAttemptsTotalQuery, TaskAttemptsTotalQueryVariables>(
    TaskAttemptsTotalDocument,
    variables,
    options,
  )
}
export type TaskAttemptsTotalQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  TaskAttemptsTotalQuery,
  TaskAttemptsTotalQueryVariables
>
export const TaskAttemptCreatedDocument = gql`
  subscription TaskAttemptCreated($taskId: ID!) {
    attemptCreated(taskId: $taskId) {
      ...TaskAttempt
    }
  }
  ${TaskAttemptFragmentDoc}
`

/**
 * __useTaskAttemptCreatedSubscription__
 *
 * To run a query within a Vue component, call `useTaskAttemptCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskAttemptCreatedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useTaskAttemptCreatedSubscription({
 *   taskId: // value for 'taskId'
 * });
 */
export function useTaskAttemptCreatedSubscription(
  variables:
    | TaskAttemptCreatedSubscriptionVariables
    | VueCompositionApi.Ref<TaskAttemptCreatedSubscriptionVariables>
    | ReactiveFunction<TaskAttemptCreatedSubscriptionVariables>,
  options:
    | VueApolloComposable.UseSubscriptionOptions<
        TaskAttemptCreatedSubscription,
        TaskAttemptCreatedSubscriptionVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseSubscriptionOptions<
          TaskAttemptCreatedSubscription,
          TaskAttemptCreatedSubscriptionVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseSubscriptionOptions<
          TaskAttemptCreatedSubscription,
          TaskAttemptCreatedSubscriptionVariables
        >
      > = {},
) {
  return VueApolloComposable.useSubscription<TaskAttemptCreatedSubscription, TaskAttemptCreatedSubscriptionVariables>(
    TaskAttemptCreatedDocument,
    variables,
    options,
  )
}
export type TaskAttemptCreatedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<
  TaskAttemptCreatedSubscription,
  TaskAttemptCreatedSubscriptionVariables
>
export const TaskListTotalDocument = gql`
  query TaskListTotal($filter: TaskListFilter!) {
    tasks(filter: $filter) {
      total
    }
  }
`

/**
 * __useTaskListTotalQuery__
 *
 * To run a query within a Vue component, call `useTaskListTotalQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskListTotalQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTaskListTotalQuery({
 *   filter: // value for 'filter'
 * });
 */
export function useTaskListTotalQuery(
  variables:
    | TaskListTotalQueryVariables
    | VueCompositionApi.Ref<TaskListTotalQueryVariables>
    | ReactiveFunction<TaskListTotalQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskListTotalQuery, TaskListTotalQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TaskListTotalQuery, TaskListTotalQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TaskListTotalQuery, TaskListTotalQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<TaskListTotalQuery, TaskListTotalQueryVariables>(
    TaskListTotalDocument,
    variables,
    options,
  )
}
export function useTaskListTotalLazyQuery(
  variables:
    | TaskListTotalQueryVariables
    | VueCompositionApi.Ref<TaskListTotalQueryVariables>
    | ReactiveFunction<TaskListTotalQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskListTotalQuery, TaskListTotalQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TaskListTotalQuery, TaskListTotalQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TaskListTotalQuery, TaskListTotalQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<TaskListTotalQuery, TaskListTotalQueryVariables>(
    TaskListTotalDocument,
    variables,
    options,
  )
}
export type TaskListTotalQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  TaskListTotalQuery,
  TaskListTotalQueryVariables
>
export const TaskListDocument = gql`
  query TaskList($pagination: Pagination!, $filter: TaskListFilter!) {
    tasks(pagination: $pagination, filter: $filter) {
      data {
        ...BasicTask
      }
    }
  }
  ${BasicTaskFragmentDoc}
`

/**
 * __useTaskListQuery__
 *
 * To run a query within a Vue component, call `useTaskListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskListQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useTaskListQuery({
 *   pagination: // value for 'pagination'
 *   filter: // value for 'filter'
 * });
 */
export function useTaskListQuery(
  variables:
    | TaskListQueryVariables
    | VueCompositionApi.Ref<TaskListQueryVariables>
    | ReactiveFunction<TaskListQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<TaskListQuery, TaskListQueryVariables>(TaskListDocument, variables, options)
}
export function useTaskListLazyQuery(
  variables:
    | TaskListQueryVariables
    | VueCompositionApi.Ref<TaskListQueryVariables>
    | ReactiveFunction<TaskListQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<TaskListQuery, TaskListQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<TaskListQuery, TaskListQueryVariables>(TaskListDocument, variables, options)
}
export type TaskListQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  TaskListQuery,
  TaskListQueryVariables
>
export const CreateTaskDocument = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateTaskMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(
  options:
    | VueApolloComposable.UseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>
    | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>>,
) {
  return VueApolloComposable.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options)
}
export type CreateTaskMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  CreateTaskMutation,
  CreateTaskMutationVariables
>
export const CreateTaskAttemptDocument = gql`
  mutation CreateTaskAttempt($taskId: ID!, $input: CreateAttemptInput!) {
    task(taskId: $taskId) {
      createAttempt(input: $input) {
        id
      }
    }
  }
`

/**
 * __useCreateTaskAttemptMutation__
 *
 * To run a mutation, you first call `useCreateTaskAttemptMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskAttemptMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateTaskAttemptMutation({
 *   variables: {
 *     taskId: // value for 'taskId'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskAttemptMutation(
  options:
    | VueApolloComposable.UseMutationOptions<CreateTaskAttemptMutation, CreateTaskAttemptMutationVariables>
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<CreateTaskAttemptMutation, CreateTaskAttemptMutationVariables>
      >,
) {
  return VueApolloComposable.useMutation<CreateTaskAttemptMutation, CreateTaskAttemptMutationVariables>(
    CreateTaskAttemptDocument,
    options,
  )
}
export type CreateTaskAttemptMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<
  CreateTaskAttemptMutation,
  CreateTaskAttemptMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      id
      name
      email
      avatar
      canCreateTasks
    }
  }
`

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options)
}
export function useMeLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options)
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>
export const UsersSearchDocument = gql`
  query UsersSearch($query: String!) {
    usersSearch(query: $query) {
      id
      name
      email
      avatar
    }
  }
`

/**
 * __useUsersSearchQuery__
 *
 * To run a query within a Vue component, call `useUsersSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersSearchQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUsersSearchQuery({
 *   query: // value for 'query'
 * });
 */
export function useUsersSearchQuery(
  variables:
    | UsersSearchQueryVariables
    | VueCompositionApi.Ref<UsersSearchQueryVariables>
    | ReactiveFunction<UsersSearchQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UsersSearchQuery, UsersSearchQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersSearchQuery, UsersSearchQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersSearchQuery, UsersSearchQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<UsersSearchQuery, UsersSearchQueryVariables>(
    UsersSearchDocument,
    variables,
    options,
  )
}
export function useUsersSearchLazyQuery(
  variables:
    | UsersSearchQueryVariables
    | VueCompositionApi.Ref<UsersSearchQueryVariables>
    | ReactiveFunction<UsersSearchQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UsersSearchQuery, UsersSearchQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersSearchQuery, UsersSearchQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersSearchQuery, UsersSearchQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<UsersSearchQuery, UsersSearchQueryVariables>(
    UsersSearchDocument,
    variables,
    options,
  )
}
export type UsersSearchQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<
  UsersSearchQuery,
  UsersSearchQueryVariables
>
export const UserDocument = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      name
      email
      avatar
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a Vue component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserQuery({
 *   userId: // value for 'userId'
 * });
 */
export function useUserQuery(
  variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {},
) {
  return VueApolloComposable.useQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options)
}
export function useUserLazyQuery(
  variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>>
    | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {},
) {
  return VueApolloComposable.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options)
}
export type UserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserQuery, UserQueryVariables>
