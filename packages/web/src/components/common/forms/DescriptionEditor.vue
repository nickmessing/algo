<script setup lang="ts">
import { Bold } from '@tiptap/extension-bold'
import { BulletList } from '@tiptap/extension-bullet-list'
import { Code } from '@tiptap/extension-code'
import { CodeBlock } from '@tiptap/extension-code-block'
import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'
import { Italic } from '@tiptap/extension-italic'
import { ListItem } from '@tiptap/extension-list-item'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { watch } from 'vue'

import IconFormatBold from '@/icons/IconFormatBold.vue'
import IconFormatBulletedList from '@/icons/IconFormatBulletedList.vue'
import IconFormatCode from '@/icons/IconFormatCode.vue'
import IconFormatCodeBlock from '@/icons/IconFormatCodeBlock.vue'
import IconFormatItalic from '@/icons/IconFormatItalic.vue'
import IconFormatSubscript from '@/icons/IconFormatSubscript.vue'
import IconFormatSuperscript from '@/icons/IconFormatSuperscript.vue'
import IconFormatTitle from '@/icons/IconFormatTitle.vue'
import IconFormatUnderline from '@/icons/IconFormatUnderline.vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  isErrored?: boolean
}>()
const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'blur'): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    Document,
    Paragraph,
    Text,
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    Heading.configure({
      levels: [3],
    }),
    BulletList,
    ListItem,
    Bold,
    Italic,
    Underline,
    Subscript,
    Superscript,
    Code,
    CodeBlock,
  ],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  },
  onFocus({ editor }) {
    if (editor.getHTML() === '<p></p>') {
      editor.commands.setContent('<h3></h3>')
    }
  },
  onBlur() {
    emit('blur')
  },
})

watch(
  () => props.modelValue,
  value => {
    if (editor.value == null) {
      return
    }

    if (value !== editor.value.getHTML()) {
      editor.value.commands.setContent(value)
    }
  },
)
</script>

<template>
  <div class="description-editor" :class="{ errored: props.isErrored }">
    <div v-if="editor" class="format-icons">
      <button
        class="icon"
        :class="{ active: editor.isActive('heading', { level: 3 }) }"
        @click.prevent="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <IconFormatTitle />
      </button>
      <button
        class="icon"
        :class="{ active: editor.isActive('bulletList') }"
        @click.prevent="editor?.chain().focus().toggleBulletList().run()"
      >
        <IconFormatBulletedList />
      </button>
      <div class="separator" />
      <button
        class="icon"
        :class="{ active: editor.isActive('bold') }"
        @click.prevent="editor?.chain().focus().toggleBold().run()"
      >
        <IconFormatBold />
      </button>
      <button
        class="icon"
        :class="{ active: editor.isActive('italic') }"
        @click.prevent="editor?.chain().focus().toggleItalic().run()"
      >
        <IconFormatItalic />
      </button>
      <button
        class="icon"
        :class="{ active: editor.isActive('underline') }"
        @click.prevent="editor?.chain().focus().toggleUnderline().run()"
      >
        <IconFormatUnderline />
      </button>
      <div class="separator" />
      <button
        class="icon"
        :class="{ active: editor.isActive('subscript') }"
        :disabled="editor.isActive('superscript')"
        @click.prevent="editor?.chain().focus().toggleSubscript().run()"
      >
        <IconFormatSubscript />
      </button>
      <button
        class="icon"
        :class="{ active: editor.isActive('superscript') }"
        :disabled="editor.isActive('subscript')"
        @click.prevent="editor?.chain().focus().toggleSuperscript().run()"
      >
        <IconFormatSuperscript />
      </button>
      <div class="separator" />
      <button
        class="icon"
        :class="{ active: editor.isActive('code') }"
        @click.prevent="editor?.chain().focus().toggleCode().run()"
      >
        <IconFormatCode />
      </button>
      <button
        class="icon"
        :class="{ active: editor.isActive('codeBlock') }"
        @click.prevent="editor?.chain().focus().toggleCodeBlock().run()"
      >
        <IconFormatCodeBlock />
      </button>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<style lang="scss" scoped>
.description-editor {
  min-height: 34px;
  width: 100%;
  position: relative;
  border-radius: 8px;

  &.errored {
    background-color: var(--color-alert-error-background);
  }

  .format-icons {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 16px;
    gap: 8px;
    width: 56px;
    background: var(--color-background-block);
    border-width: 1px 0px 1px 1px;
    border-style: solid;
    border-color: var(--color-border);
    border-radius: 8px 0px 0px 8px;
    transform: translateX(-81px);

    .icon {
      height: var(--icon-size);
      width: var(--icon-size);
      border-radius: 4px;
      cursor: pointer;

      &.active {
        background: var(--color-border);
      }

      &:disabled {
        opacity: 0.5;
      }
    }

    .separator {
      height: 1px;
      width: var(--icon-size);
      background: var(--color-border);
    }
  }

  :deep(.ProseMirror p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    color: var(--color-placeholder);
    font-size: var(--font-size-heading);
    pointer-events: none;
    height: 0;
  }
}
</style>
