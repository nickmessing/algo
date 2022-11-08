<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { computed, shallowRef, watch } from 'vue'

import { cache } from '@/apollo/cache'
import UserPicker from '@/components/common/forms/UserPicker.vue'
import PageContainer from '@/components/common/layout/PageContainer.vue'
import {
  TaskAttemptsDocument,
  useTaskAttemptCreatedSubscription,
  useTaskAttemptsTotalQuery,
  type Task,
  type TaskAttemptsQuery,
} from '@/generated/graphql'
import IconLoadingSpinning from '@/icons/IconLoadingSpinning.vue'
import { ITEMS_PER_PAGE } from '@/utils/constants'

import AttemptsPage from './AttemptsPage.vue'

import type { DeepPick } from '@/types/graphql'

const props = defineProps<{
  task: DeepPick<
    Task,
    {
      __typename: true
      id: true
    }
  >
}>()

const bottomIndicatorRef = shallowRef<HTMLDivElement | null>(null)
const isBottomIndicatorVisible = shallowRef(false)

useIntersectionObserver(bottomIndicatorRef, ([{ isIntersecting }]) => {
  isBottomIndicatorVisible.value = isIntersecting
})

const userToFilterBy = shallowRef<string | null>(null)
const visiblePagesCount = shallowRef(1)
const pagesLoaded = shallowRef<{ [key: number]: boolean | undefined }>({})
const prefixedAttemptsCount = shallowRef(0)
const loadedPagesCount = computed(
  () =>
    new Array(visiblePagesCount.value)
      .fill(0)
      .map((_, index) => index + 1)
      .filter(page => pagesLoaded.value[page]).length,
)

const { result } = useTaskAttemptsTotalQuery({
  taskId: props.task.id,
  userId: userToFilterBy.value,
})

const { result: taskAttemptCreated } = useTaskAttemptCreatedSubscription(() => ({
  taskId: props.task.id,
}))

watch(taskAttemptCreated, value => {
  if (value) {
    cache.updateQuery(
      {
        query: TaskAttemptsDocument,
        variables: {
          taskId: props.task.id,
          pagination: {
            take: ITEMS_PER_PAGE,
            skip: 0,
          },
          userId: userToFilterBy.value,
        },
      },
      (data): TaskAttemptsQuery => {
        const prev = data as TaskAttemptsQuery

        const newList = [value.attemptCreated, ...prev.task.attempts.data]
        return {
          ...prev,
          task: {
            ...prev.task,
            attempts: {
              ...prev.task.attempts,
              data: newList,
            },
          },
        }
      },
    )
  }
})

const handlePageLoaded = (payload: { attemptsCount: number; page: number }) => {
  pagesLoaded.value = {
    ...pagesLoaded.value,
    [payload.page]: true,
  }

  if (payload.page === 1 && payload.attemptsCount > ITEMS_PER_PAGE) {
    prefixedAttemptsCount.value = payload.attemptsCount - ITEMS_PER_PAGE
  }
}

const totalPages = computed(() => Math.ceil((result.value?.task.attempts.total ?? 1) / ITEMS_PER_PAGE))
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
  <PageContainer>
    <div class="page-flex">
      <div class="spaced-row">
        <div class="heading">Încercări</div>
        <div>
          <UserPicker v-model="userToFilterBy" placeholder="Filtrare după utilizatori" />
        </div>
      </div>
      <AttemptsPage
        v-for="page in visiblePagesCount"
        :key="page"
        :task="props.task"
        :page="page"
        :prefixedAttemptsCount="prefixedAttemptsCount"
        :userId="userToFilterBy"
        @loaded="handlePageLoaded"
      />
      <div v-if="isBottomIndicatorDisplayed" ref="bottomIndicatorRef" class="bottom-indicator">
        <IconLoadingSpinning />
      </div>
    </div>
  </PageContainer>
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
