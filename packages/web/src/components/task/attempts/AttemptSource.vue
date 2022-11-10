<script setup lang="ts">
import Prism from 'prismjs'
import { computed } from 'vue'

import { languages } from '@/utils/languages'

const props = defineProps<{
  code: string
  languageId: number
}>()

const language = computed(() => languages.find(language => language.languageId === props.languageId))

const highlightedCode = computed(() => {
  if (language.value == null) {
    return props.code
  }

  return Prism.highlight(props.code, Prism.languages[language.value.grammar], language.value.grammar)
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <pre class="attempt-source" v-html="highlightedCode" />
</template>

<style lang="scss" scoped>
.attempt-source {
  padding: 8px;
  background-color: var(--color-gray-98);
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
