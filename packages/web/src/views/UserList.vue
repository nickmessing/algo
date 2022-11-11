<script setup lang="ts">
import { refDebounced, useIntersectionObserver } from '@vueuse/core'
import { computed, shallowRef, watch } from 'vue'

import { useUserListTotalQuery, type UserListFilter } from '@/generated/graphql'
import { ITEMS_PER_PAGE } from '@/utils/constants'

import TextField from '../components/common/forms/TextField.vue'
import UserListPage from '../components/user/list/UserListPage.vue'
import IconLoadingSpinning from '../icons/IconLoadingSpinning.vue'
import IconMagnify from '../icons/IconMagnify.vue'

const bottomIndicatorRef = shallowRef<HTMLDivElement | null>(null)
const isBottomIndicatorVisible = shallowRef(false)

useIntersectionObserver(bottomIndicatorRef, ([{ isIntersecting }]) => {
  isBottomIndicatorVisible.value = isIntersecting
})
const searchString = shallowRef('')
const debouncedSearchString = refDebounced(searchString, 500)

const visiblePagesCount = shallowRef(1)
const loadedPagesCount = shallowRef(0)

const filter = computed<UserListFilter>(() => ({
  search: debouncedSearchString.value,
}))

const {
  result,
  loading: isQueryLoading,
  refetch,
} = useUserListTotalQuery(() => ({
  filter: filter.value,
}))
if (!isQueryLoading.value) {
  void refetch()
}

const totalPages = computed(() => Math.ceil((result.value?.users.total ?? 1) / ITEMS_PER_PAGE))
const isBottomIndicatorDisplayed = computed(() => visiblePagesCount.value < totalPages.value)

const shouldLoadNextPage = computed(() => {
  if (!isBottomIndicatorVisible.value || !isBottomIndicatorDisplayed.value) {
    return false
  }

  if (loadedPagesCount.value < visiblePagesCount.value) {
    return false
  }

  return true
})
watch(shouldLoadNextPage, value => {
  if (value) {
    visiblePagesCount.value += 1
  }
})
</script>

<template>
  <div class="user-list-top">
    <TextField v-model="searchString" class="field" placeholder="Căutare">
      <IconMagnify :class="{ placeholder: searchString === '' }" />
    </TextField>
  </div>

  <UserListPage
    v-for="page in visiblePagesCount"
    :key="page"
    :filter="filter"
    :page="page"
    @loaded="loadedPagesCount++"
  />
  <div v-if="isBottomIndicatorDisplayed" ref="bottomIndicatorRef" class="bottom-indicator">
    <IconLoadingSpinning />
  </div>
</template>

<style lang="scss" scoped>
.user-list-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;

  .field {
    width: 248px;

    .placeholder {
      color: var(--color-placeholder);
    }
  }
}

.bottom-indicator {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
