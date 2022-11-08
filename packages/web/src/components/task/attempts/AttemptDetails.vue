<script setup lang="ts">
import { useAttemptRunsQuery, type Attempt } from '@/generated/graphql'

import AttemptRun from './AttemptRun.vue'

import type { DeepPick } from '@/types/graphql'

const props = defineProps<{
  attempt: DeepPick<
    Attempt,
    {
      __typename: true
      id: true
    }
  >
}>()

const {
  result,
  loading: isQueryLoading,
  refetch,
} = useAttemptRunsQuery(() => ({
  attemptId: props.attempt.id,
}))
if (!isQueryLoading.value) {
  void refetch()
}
</script>

<template>
  <div class="attempt-details">
    <AttemptRun v-for="run in result?.attempt.runs" :key="run.id" :run="run" />
  </div>
</template>

<style lang="scss" scoped>
.attempt-details {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0px;
  gap: 8px;
  cursor: default;
}
</style>
