<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder: string
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'blur'): void
}>()
const model = useVModel(props, 'modelValue', emit)

const placeholderElRef = shallowRef<HTMLDivElement | null>(null)
const textElRef = shallowRef<HTMLDivElement | null>(null)

const placeholderWidth = computed(() => {
  if (!placeholderElRef.value) return 0
  return placeholderElRef.value.offsetWidth
})

const onInput = () => {
  model.value = textElRef.value?.innerText ?? ''
}
</script>

<template>
  <div class="editable-text">
    <div v-if="model === ''" ref="placeholderElRef" class="placeholder" @click="textElRef?.focus()">
      {{ props.placeholder }}
    </div>
    <div ref="textElRef" class="text" contenteditable @input="onInput" @keydown.enter.prevent @blur="emit('blur')" />
  </div>
</template>

<style lang="scss" scoped>
.editable-text {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color-placeholder);
    height: 100%;
    display: flex;
    align-items: center;
  }

  .text {
    min-width: calc(v-bind(placeholderWidth) * 1px);
    z-index: var(--z-index-text-in-editor);
    display: flex;
    align-items: center;
    line-height: 17px;
    height: 17px;
  }
}
</style>
