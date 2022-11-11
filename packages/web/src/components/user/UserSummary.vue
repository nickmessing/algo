<script setup lang="ts">
import UserAvatar from '@/components/common/user/UserAvatar.vue'

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
    }
  >
}>()
</script>

<template>
  <div class="user-summary-row">
    <div class="section">
      <UserAvatar :user="props.user" />
      <div class="small-text">{{ props.user.name ?? props.user.email }}</div>
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
  }
}
</style>
