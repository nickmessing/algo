<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { useSlots } from 'vue'

import InputContainer from '@/components/common/layout/InputContainer.vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  isErrored?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'blur', value: FocusEvent): void
}>()
const model = useVModel(props, 'modelValue', emit)
</script>

<template>
  <InputContainer :isErrored="props.isErrored">
    <slot />
    <input v-model="model" class="text-field" :placeholder="props.placeholder" @blur="emit('blur', $event)" />
  </InputContainer>
</template>

<style lang="scss" scoped>
.slot-container {
  flex-shrink: 0;
}

.text-field {
  flex: 1 0;
  height: 100%;
  border: none;
  font-size: var(--font-size-regular);

  &::placeholder {
    color: var(--color-placeholder);
    opacity: 1;
  }
}
</style>
