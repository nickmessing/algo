<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { computed } from 'vue'

import { useSuccessRate } from '@/composables/useSuccessRate'
import { messages } from '@/utils/timeagoLocalization'

import IconSpeedometer from '../../icons/IconSpeedometer.vue'
import TheTag from '../common/TheTag.vue'
import UserAvatar from '../common/user/UserAvatar.vue'

import type { Task } from '@/generated/graphql'
import type { DeepPick } from '@/types/graphql'

const props = defineProps<{
  task: DeepPick<
    Task,
    {
      __typename: true
      title: true
      createdAt: true
      usersAttemptedCount: true
      usersSuccededCount: true
      author: {
        __typename: true
        name: true
        email: true
        avatar: true
      }
      tags: true
    }
  >
}>()

const timeAgo = useTimeAgo(() => props.task.createdAt, {
  messages,
})

const successRate = computed(() => {
  if (props.task.usersAttemptedCount === 0) return '-'

  return Math.round((props.task.usersSuccededCount / props.task.usersAttemptedCount) * 100)
})

const { successRateColorString } = useSuccessRate(successRate)
</script>

<template>
  <div class="task-summary-row">
    <div class="section baseline">
      <div class="title">{{ props.task.title }}</div>
      <div class="small-text">{{ timeAgo }}</div>
    </div>
    <div class="section">
      <div class="small-text">rata de rezolvare {{ successRate }}%</div>
      <div class="success-rate-icon">
        <IconSpeedometer />
      </div>
    </div>
  </div>
  <div class="task-summary-row">
    <div class="section">
      <UserAvatar :user="props.task.author" />
      <div class="small-text">{{ props.task.author.name ?? props.task.author.email }}</div>
    </div>
    <div class="section">
      <TheTag v-for="tag in props.task.tags" :key="tag"> {{ tag }} </TheTag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-summary-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    &.baseline {
      align-items: baseline;
    }

    .title {
      font-size: var(--font-size-logo);
    }

    .small-text {
      font-size: var(--font-size-regular);
      font-weight: 300;
      color: var(--color-faded);
    }

    .success-rate-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: v-bind(successRateColorString);
    }
  }
}
</style>
