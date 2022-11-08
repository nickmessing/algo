<script lang="ts" setup>
import { Tooltip } from 'floating-vue'
import { computed } from 'vue'

import type { User } from '@/generated/graphql'

const props = defineProps<{
  user: Pick<User, '__typename' | 'avatar' | 'name' | 'email'>
}>()

const name = computed(() => (props.user.name ? `${props.user.name} <${props.user.email}>` : props.user.email))
const avatarUrl = computed(
  () => props.user.avatar ?? `https://avatars.dicebear.com/api/initials/${props.user.name ?? props.user.email}.svg`,
)
const style = computed(() => ({
  backgroundImage: `url(${avatarUrl.value})`,
}))
</script>

<template>
  <div class="avatar">
    <Tooltip class="avatar">
      <div class="avatar-image" :style="style">
        <slot />
      </div>

      <template #popper>
        <span>{{ name }}</span>
      </template>
    </Tooltip>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
  overflow: hidden;

  > .avatar-image {
    height: 100%;
    width: 100%;
    background: center center no-repeat;
    background-size: cover;
  }
}
</style>
