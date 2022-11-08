<script setup lang="ts">
import { shallowRef, watch } from 'vue'

import { useTaskListQuery, type TaskListFilter } from '@/generated/graphql'
import { ITEMS_PER_PAGE } from '@/utils/constants'

import PageContainer from '../../common/layout/PageContainer.vue'
import TaskSummary from '../TaskSummary.vue'

const props = defineProps<{
  filter: TaskListFilter
  page: number
}>()
const emit = defineEmits<{
  (event: 'loaded'): void
}>()

const loadedEmitted = shallowRef(false)

const {
  result,
  loading: isQueryLoading,
  refetch,
} = useTaskListQuery(() => ({
  filter: props.filter,
  pagination: {
    take: ITEMS_PER_PAGE,
    skip: (props.page - 1) * ITEMS_PER_PAGE,
  },
}))
if (!isQueryLoading.value) {
  void refetch()
}

watch(
  result,
  value => {
    if (value && !loadedEmitted.value) {
      emit('loaded')
      loadedEmitted.value = true
    }
  },
  { immediate: true },
)
</script>

<template>
  <PageContainer v-for="task in result?.tasks.data" :key="task.id">
    <RouterLink :to="`/tasks/${task.id}`" class="page-flex">
      <TaskSummary :task="task" />
    </RouterLink>
  </PageContainer>
</template>
