<script setup lang="ts">
import { shallowRef, watch } from 'vue'

import { useUserListQuery, type UserListFilter } from '@/generated/graphql'
import { ITEMS_PER_PAGE } from '@/utils/constants'

import PageContainer from '../../common/layout/PageContainer.vue'
import UserSummary from '../UserSummary.vue'

const props = defineProps<{
  filter: UserListFilter
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
} = useUserListQuery(() => ({
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
  <PageContainer v-for="user in result?.users.data" :key="user.id">
    <RouterLink :to="`/users/${user.id}`" class="page-flex">
      <UserSummary :user="user" />
    </RouterLink>
  </PageContainer>
</template>
