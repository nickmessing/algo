<script setup lang="ts">
import { refDebounced, useVModel } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

import TheTag from '@/components/common/TheTag.vue'
import { useTagsQuery } from '@/generated/graphql'
import IconTag from '@/icons/IconTag.vue'

import DropDownSelect from './DropDownSelect.vue'

const props = defineProps<{
  modelValue: string[]
  placeholder?: string
  isErrored?: boolean
  disableCustomTags?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void
  (event: 'blur', value: FocusEvent): void
}>()

const model = useVModel(props, 'modelValue', emit)

const searchString = shallowRef('')
const lowerCasedSearchString = computed(() => searchString.value.toLowerCase())

const debouncedSearchString = refDebounced(lowerCasedSearchString, 300)

const {
  result,
  loading: isQueryLoading,
  refetch,
} = useTagsQuery(() => ({
  search: debouncedSearchString.value,
}))

if (!isQueryLoading.value) {
  void refetch()
}

const isLoading = computed(() => isQueryLoading.value || debouncedSearchString.value !== lowerCasedSearchString.value)

const tags = computed(() => (result.value?.tags ?? []).filter(tag => !model.value.includes(tag)))
const options = computed(() =>
  tags.value.length > 0
    ? tags.value.map(tag => ({ key: tag, value: tag }))
    : props.disableCustomTags
    ? []
    : [{ key: lowerCasedSearchString.value, value: lowerCasedSearchString.value }],
)
const removeTag = (tag: string) => {
  model.value = model.value.filter(t => t !== tag)
}
</script>

<template>
  <DropDownSelect
    v-model:searchString="searchString"
    v-model:multipleValue="model"
    :placeholder="props.placeholder"
    :options="options"
    :isLoading="isLoading"
    :isErrored="props.isErrored"
    isMultiple
    shouldEnterOnSpace
  >
    <template #prefix>
      <slot name="icon">
        <IconTag class="shrink-0" />
      </slot>
      <TheTag v-for="tag in model" :key="tag" class="tag-clickable" @click="removeTag(tag)">
        <span>{{ tag }}</span>
      </TheTag>
    </template>
    <template #option="{ item }">
      <span>{{ item.value }}</span>
    </template>
  </DropDownSelect>
</template>

<style lang="scss" scoped>
.tag-clickable {
  cursor: pointer;
}
</style>
