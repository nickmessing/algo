<script setup lang="ts">
import UserAvatar from '@/components/common/user/UserAvatar.vue'
import { useMe } from '@/composables/apollo/useMe'

import GoogleAuth from './GoogleAuth.vue'

const { result, loading: isLoading } = useMe()
</script>

<template>
  <template v-if="!isLoading">
    <UserAvatar v-if="result?.me != null" :user="result.me" />
    <GoogleAuth v-else />
  </template>
</template>
