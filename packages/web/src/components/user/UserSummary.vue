<script setup lang="ts">
import { computed } from 'vue'

import UserAvatar from '@/components/common/user/UserAvatar.vue'
import { useSuccessRate } from '@/composables/useSuccessRate'
import IconSpeedometer from '@/icons/IconSpeedometer.vue'

import type { User } from '@/generated/graphql'
import type { DeepPick } from '@/types/graphql'

const props = defineProps<{
  user: DeepPick<
    User,
    {
      __typename: true
      name: true
      email: true
      avatar: true
      tasksAttemptedCount: true
      tasksSuccededCount: true
    }
  >
}>()

const successRate = computed(() => {
  if (props.user.tasksAttemptedCount === 0) return '-'

  return Math.round((props.user.tasksSuccededCount / props.user.tasksAttemptedCount) * 100)
})

const { successRateColorString } = useSuccessRate(successRate)
</script>

<template>
  <div class="user-summary-row">
    <div class="section">
      <UserAvatar :user="props.user" />
      <div class="small-text">{{ props.user.name ?? props.user.email }}</div>
    </div>
    <div class="section">
      <div class="small-text">
        rata de rezolvare {{ successRate }}% ({{ props.user.tasksSuccededCount }} /
        {{ props.user.tasksAttemptedCount }})
      </div>
      <div class="success-rate-icon">
        <IconSpeedometer />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-summary-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

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
