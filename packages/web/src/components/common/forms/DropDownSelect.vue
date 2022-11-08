<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

import InputContainer from '@/components/common/layout/InputContainer.vue'
import IconLoadingSpinning from '@/icons/IconLoadingSpinning.vue'

const props = defineProps<{
  searchString: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { key: string; value: any }[]
  singleValue?: string | null
  multipleValue?: string[]
  placeholder?: string
  isErrored?: boolean
  isLoading?: boolean
  isMultiple?: boolean
  isInputHidden?: boolean
  shouldEnterOnSpace?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:searchString', value: string): void
  (event: 'update:singleValue', value: string): void
  (event: 'update:multipleValue', value: string[]): void
  (event: 'blur', value: FocusEvent): void
}>()

const singleModel = useVModel(props, 'singleValue', emit)
const multipleModel = useVModel(props, 'multipleValue', emit)
const searchString = useVModel(props, 'searchString', emit)

const currentSelection = shallowRef<string | null>(null)

const isDropdownOpen = computed(() => searchString.value.length > 0)

const onKeyPressDown = () => {
  if (!isDropdownOpen.value) {
    return
  }

  const index = props.options.findIndex(element => element.key === (currentSelection.value ?? ''))
  currentSelection.value = props.options[index + 1]?.key ?? currentSelection.value
}
const onKeyPressUp = () => {
  if (!isDropdownOpen.value) {
    return
  }

  const index = props.options.findIndex(element => element.key === (currentSelection.value ?? ''))
  currentSelection.value = props.options[index - 1]?.key ?? currentSelection.value
}
const onKeyPressEnter = () => {
  if (!isDropdownOpen.value || currentSelection.value == null || currentSelection.value === '' || props.isLoading) {
    return
  }

  if (props.isMultiple) {
    multipleModel.value = [...(multipleModel.value ?? []), currentSelection.value]
  } else {
    singleModel.value = currentSelection.value
  }

  searchString.value = ''
  currentSelection.value = null
}
const onKeyPressBackspace = () => {
  if (searchString.value.length > 0) {
    return
  }

  if (props.isMultiple) {
    multipleModel.value = multipleModel.value?.slice(0, -1) ?? []
  } else {
    singleModel.value = null
  }
}
const onKeyPressSpace = (event: Event) => {
  if (props.shouldEnterOnSpace) {
    onKeyPressEnter()
    event.preventDefault()
  }
}
</script>

<template>
  <InputContainer :isErrored="props.isErrored">
    <div
      class="drop-down-picker"
      :class="{ empty: searchString === '' && (props.isMultiple ? (multipleModel?.length ?? 0) === 0 : !singleModel) }"
    >
      <slot name="prefix" />
      <div class="input-container">
        <input
          v-if="!props.isInputHidden"
          v-model="searchString"
          class="drop-down-search-input"
          :placeholder="props.placeholder"
          @keydown.down.prevent="onKeyPressDown"
          @keydown.up.prevent="onKeyPressUp"
          @keydown.enter.prevent="onKeyPressEnter"
          @keydown.space="onKeyPressSpace"
          @keydown.backspace="onKeyPressBackspace"
          @blur="emit('blur', $event)"
        />
        <div v-if="isDropdownOpen" class="drop-down-list" @click="onKeyPressEnter">
          <div v-if="isLoading" class="loading">
            <IconLoadingSpinning />
          </div>
          <template v-else-if="props.options.length > 0">
            <div
              v-for="element in props.options"
              :key="element.key"
              class="drop-down-option"
              :class="{ hovered: currentSelection === element.key }"
              @mouseover="currentSelection = element.key"
            >
              <slot name="option" :item="element" />
            </div>
          </template>
          <div v-else>
            <slot name="empty">
              <div class="drop-down-option">Nimic nu a fost găsit</div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </InputContainer>
</template>

<style lang="scss" scoped>
.drop-down-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-regular);
  width: 100%;
  height: 100%;

  &.empty {
    color: var(--color-placeholder);
  }

  .input-container {
    flex-grow: 1;
    height: 100%;
    position: relative;

    .drop-down-search-input {
      display: block;
      min-width: 0;
      border: none;
      font-size: var(--font-size-regular);
      color: var(--color-text);
      width: 100%;
      height: 100%;

      &::placeholder {
        color: var(--color-placeholder);
        opacity: 1;
      }
    }

    .drop-down-list {
      position: absolute;
      background: var(--color-background-block);
      padding: 8px 0;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      color: var(--color-text);
      width: 200px;
      z-index: var(--z-index-dropdown);

      .drop-down-option {
        padding: 8px 16px;
        cursor: pointer;
        transition: background 0.2s;

        &.hovered {
          background: var(--color-primary-lite);
        }
      }

      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 0;
      }
    }
  }
}
</style>
