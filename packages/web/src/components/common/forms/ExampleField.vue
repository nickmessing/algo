<script setup lang="ts">
import { Document } from '@tiptap/extension-document'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Text } from '@tiptap/extension-text'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { useVModel } from '@vueuse/core'
import { computed, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'focus'): void
  (event: 'blur'): void
}>()

const model = useVModel(props, 'modelValue', emit)
const htmlified = computed(() => (model.value ? `<p>${model.value.trim().split('\n').join('</p><p>')}</p>` : ''))

const editor = useEditor({
  content: htmlified.value,
  extensions: [
    Document,
    Text,
    Paragraph,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  onUpdate({ editor }) {
    model.value = editor
      .getText({
        blockSeparator: '\n',
      })
      .trim()
  },
  onFocus() {
    emit('focus')
  },
  onBlur() {
    emit('blur')
  },
})

watch(model, value => {
  if (editor.value == null) {
    return
  }

  if (
    editor.value
      .getText({
        blockSeparator: '\n',
      })
      .trim() !== value
  ) {
    editor.value.commands.setContent(htmlified.value)
  }
})

defineExpose({
  focus() {
    editor.value?.commands.focus()
  },
})
</script>

<template>
  <div class="example-field">
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss" scoped>
.example-field {
  width: 100%;
  justify-self: stretch;
  align-self: stretch;
  flex-grow: 1;

  > div {
    height: 100%;
    width: 100%;

    > :deep(.ProseMirror) {
      height: 100%;
      width: 100%;

      p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: var(--color-placeholder);
        pointer-events: none;
        height: 0;
      }
    }
  }
}
</style>
