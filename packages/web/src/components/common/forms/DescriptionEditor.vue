<script setup lang="ts">
import { Bold } from '@tiptap/extension-bold'
import { BulletList } from '@tiptap/extension-bullet-list'
import { Code } from '@tiptap/extension-code'
import { CodeBlock } from '@tiptap/extension-code-block'
import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'
import { History } from '@tiptap/extension-history'
import { Italic } from '@tiptap/extension-italic'
import { ListItem } from '@tiptap/extension-list-item'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'
import { useEditor, EditorContent, type Editor } from '@tiptap/vue-3'
import { watch, type Component } from 'vue'

import IconFormatBold from '@/icons/IconFormatBold.vue'
import IconFormatBulletedList from '@/icons/IconFormatBulletedList.vue'
import IconFormatCode from '@/icons/IconFormatCode.vue'
import IconFormatCodeBlock from '@/icons/IconFormatCodeBlock.vue'
import IconFormatItalic from '@/icons/IconFormatItalic.vue'
import IconFormatSubscript from '@/icons/IconFormatSubscript.vue'
import IconFormatSuperscript from '@/icons/IconFormatSuperscript.vue'
import IconFormatTitle from '@/icons/IconFormatTitle.vue'
import IconFormatUnderline from '@/icons/IconFormatUnderline.vue'
import IconRedo from '@/icons/IconRedo.vue'
import IconUndo from '@/icons/IconUndo.vue'

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
    History,
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

type NodeSeparator = {
  type: 'separator'
}
type NodeButton = {
  type: 'button'
  icon: Component
  isActive?: (editor: Editor) => boolean
  isDisabled?: (editor: Editor) => boolean
  action: () => void
}

type Node = NodeSeparator | NodeButton

const nodes: Node[] = [
  {
    type: 'button',
    icon: IconFormatTitle,
    isActive: editor => editor.isActive('heading', { level: 3 }),
    action: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    type: 'button',
    icon: IconFormatBold,
    isActive: editor => editor.isActive('bold'),
    action: () => editor.value?.chain().focus().toggleBold().run(),
  },
  {
    type: 'button',
    icon: IconFormatItalic,
    isActive: editor => editor.isActive('italic'),
    action: () => editor.value?.chain().focus().toggleItalic().run(),
  },
  {
    type: 'button',
    icon: IconFormatUnderline,
    isActive: editor => editor.isActive('underline'),
    action: () => editor.value?.chain().focus().toggleUnderline().run(),
  },
  {
    type: 'button',
    icon: IconFormatSubscript,
    isActive: editor => editor.isActive('subscript'),
    action: () => editor.value?.chain().focus().toggleSubscript().run(),
  },
  {
    type: 'button',
    icon: IconFormatSuperscript,
    isActive: editor => editor.isActive('superscript'),
    action: () => editor.value?.chain().focus().toggleSuperscript().run(),
  },
  {
    type: 'separator',
  },
  {
    type: 'button',
    icon: IconFormatBulletedList,
    isActive: editor => editor.isActive('bulletList'),
    action: () => editor.value?.chain().focus().toggleBulletList().run(),
  },
  {
    type: 'button',
    icon: IconFormatCode,
    isActive: editor => editor.isActive('code'),
    action: () => editor.value?.chain().focus().toggleCode().run(),
  },
  {
    type: 'button',
    icon: IconFormatCodeBlock,
    isActive: editor => editor.isActive('codeBlock'),
    action: () => editor.value?.chain().focus().toggleCodeBlock().run(),
  },
  {
    type: 'separator',
  },
  {
    type: 'button',
    icon: IconUndo,
    isDisabled: editor => !editor.can().undo(),
    action: () => editor.value?.chain().focus().undo().run(),
  },
  {
    type: 'button',
    icon: IconRedo,
    isDisabled: editor => !editor.can().redo(),
    action: () => editor.value?.chain().focus().redo().run(),
  },
]

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
      <template v-for="(node, index) in nodes" :key="index">
        <div v-if="node.type === 'separator'" class="separator" />
        <button
          v-else
          class="icon"
          :class="{ active: node.isActive?.(editor) }"
          :disabled="node.isDisabled?.(editor)"
          @click.prevent="node.action()"
        >
          <Component :is="node.icon" />
        </button>
      </template>
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
