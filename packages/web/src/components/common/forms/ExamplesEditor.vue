<script setup lang="ts">
import { refDebounced, useVModel } from '@vueuse/core'
import { computed, nextTick, shallowRef, watch } from 'vue'

import IconTrashcan from '../../../icons/IconTrashcan.vue'

import ExampleField from './ExampleField.vue'

const props = defineProps<{
  modelValue: { input: string; output: string }[]
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: { input: string; output: string }[]): void
  (event: 'focus'): void
  (event: 'blur'): void
}>()
const model = useVModel(props, 'modelValue', emit)

const inputRefs = shallowRef<{ focus(): void }[]>([])

const focusedElements = shallowRef(0)
const isFocused = computed(() => focusedElements.value > 0)
const debouncedIsFocused = refDebounced(isFocused, 100)

watch(debouncedIsFocused, value => {
  if (value) {
    emit('focus')
  } else {
    emit('blur')
  }
})

const updateModel = (index: number, key: 'input' | 'output', value: string) => {
  model.value = model.value.map((example, i) => (i === index ? { ...example, [key]: value } : example))
}
const removeExample = (index: number) => {
  model.value = model.value.filter((_, i) => i !== index)
}

watch(model, async (value, oldValue) => {
  if (value.length > oldValue.length) {
    await nextTick()
    inputRefs.value[value.length - 1].focus()
  }
})
</script>

<template>
  <div v-for="(example, index) in model" :key="index" class="example-editor-row">
    <div class="editor input">
      <div>Intrare:</div>
      <ExampleField
        ref="inputRefs"
        :modelValue="example.input"
        placeholder="Exemplu de intrare"
        @update:modelValue="updateModel(index, 'input', $event)"
        @focus="focusedElements++"
        @blur="focusedElements--"
      />
    </div>
    <div class="editor output">
      <div>Ieșire:</div>
      <ExampleField
        :modelValue="example.output"
        placeholder="Exemplu de ieșire"
        @update:modelValue="updateModel(index, 'output', $event)"
        @focus="focusedElements++"
        @blur="focusedElements--"
      />
    </div>
    <div class="remove-icon">
      <IconTrashcan @click="removeExample(index)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.example-editor-row {
  --row-gap: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: var(--row-gap);
  width: 100%;

  .editor {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px;
    gap: 8px;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    width: calc((100% - 2 * var(--row-gap) - var(--icon-size)) / 2);
    align-self: stretch;
  }

  .remove-icon {
    cursor: pointer;
    height: var(--icon-size);
  }
}
</style>
