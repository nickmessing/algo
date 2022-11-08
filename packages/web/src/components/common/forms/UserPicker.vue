<script setup lang="ts">
import { refDebounced, useVModel } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

import { useUsersSearchQuery, useUserQuery } from '@/generated/graphql'

import IconClose from '../../../icons/IconClose.vue'
import IconFilter from '../../../icons/IconFilter.vue'
import UserAvatar from '../user/UserAvatar.vue'

import DropDownSelect from './DropDownSelect.vue'

const props = defineProps<{
  modelValue: string | null
  placeholder?: string
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const model = useVModel(props, 'modelValue', emit)

const searchString = shallowRef('')
const debouncedSearchString = refDebounced(searchString, 300)

const {
  result,
  loading: isQueryLoading,
  refetch,
} = useUsersSearchQuery(() => ({
  query: debouncedSearchString.value,
}))
if (!isQueryLoading.value) {
  void refetch()
}
const { result: userResult } = useUserQuery(
  () => ({
    userId: model.value ?? '',
  }),
  () => ({
    enabled: model.value != null,
  }),
)

const isLoading = computed(() => isQueryLoading.value || debouncedSearchString.value !== searchString.value)
const options = computed(() => result.value?.usersSearch.map(user => ({ key: user.id, value: user })) ?? [])
</script>

<template>
  <DropDownSelect
    v-model:searchString="searchString"
    v-model:singleValue="model"
    class="user-picker"
    :placeholder="props.placeholder"
    :options="options"
    :isLoading="isLoading"
    :isInputHidden="model != null"
  >
    <template #prefix>
      <IconFilter class="no-shrink" />
      <template v-if="userResult?.user && model != null">
        <div class="user-selected">
          <div>
            {{ userResult.user.name ?? userResult.user.email }}
          </div>
          <UserAvatar :user="userResult.user">
            <div class="clear-user" @click="model = null">
              <IconClose />
            </div>
          </UserAvatar>
        </div>
      </template>
    </template>
    <template #option="{ item }">
      <span>{{ item.value.name ?? item.value.email }}</span>
    </template>
  </DropDownSelect>
</template>

<style lang="scss" scoped>
.user-picker {
  width: 320px;

  &:hover .user-selected .clear-user {
    opacity: 1;
  }

  .no-shrink {
    flex-shrink: 0;
  }

  .user-selected {
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    width: 100%;
    justify-content: space-between;

    .clear-user {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: hsla(0, 0%, 100%, 0.7);
      opacity: 0;
      transition: opacity 0.1s ease;
    }
  }
}
</style>
