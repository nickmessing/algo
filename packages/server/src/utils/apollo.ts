import { Task } from '@prisma/client'

import { Pagination, TaskListFilter, UserListFilter } from '../generated/graphql'

export type PaginatedAttemptListContext = {
  task: Task
  userId: string | null | undefined
  pagination: Pagination | null | undefined
}

export type PaginatedTaskListContext = {
  pagination: Pagination | null | undefined
  filter: TaskListFilter
}

export type PaginatedUserListContext = {
  pagination: Pagination | null | undefined
  filter: UserListFilter
}
