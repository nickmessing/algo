<script setup lang="ts">
import { watch } from 'vue'

import { useTaskAttemptsQuery, type Task } from '@/generated/graphql'
import { ITEMS_PER_PAGE } from '@/utils/constants'

import AttemptRow from './AttemptRow.vue'

import type { DeepPick } from '@/types/graphql'

const props = defineProps<{
  task: DeepPick<
    Task,
    {
      __typename: true
      id: true
    }
  >
  page: number
  prefixedAttemptsCount: number
  userId?: string | null
}>()

const emit = defineEmits<{
  (event: 'loaded', payload: { attemptsCount: number; page: number }): void
}>()

const {
  result,
  loading: isQueryLoading,
  refetch,
} = useTaskAttemptsQuery(() => ({
  taskId: props.task.id,
  pagination: {
    take: ITEMS_PER_PAGE,
    skip: (props.page - 1) * ITEMS_PER_PAGE + (props.page > 1 ? props.prefixedAttemptsCount : 0),
  },
  userId: props.userId,
}))
if (!isQueryLoading.value) {
  void refetch()
}

watch(
  result,
  value => {
    if (value) {
      emit('loaded', {
        attemptsCount: value.task.attempts.data.length,
        page: props.page,
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <AttemptRow v-for="attempt in result?.task.attempts.data" :key="attempt.id" :attempt="attempt" />
</template>

<style lang="scss" setup>
.spaced-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .heading {
    font-size: var(--font-size-heading);
  }
}
</style>
