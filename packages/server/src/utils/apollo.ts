import { Task } from '@prisma/client'

import { Pagination, TaskListFilter } from '../generated/graphql'

export type PaginatedAttemptListContext = {
  task: Task
  userId: string | null | undefined
  pagination: Pagination | null | undefined
}

export type PaginatedTaskListContext = {
  pagination: Pagination | null | undefined
  filter: TaskListFilter
}
