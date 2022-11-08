<script setup lang="ts">
import { Tooltip } from 'floating-vue'
import { shallowRef, watch } from 'vue'

import IconLoadingSpinning from '../../../icons/IconLoadingSpinning.vue'
import InputContainer from '../layout/InputContainer.vue'
import TheTag from '../TheTag.vue'

import type { FileWithContent } from '@/types/files'

const props = defineProps<{
  isMultiple?: boolean
  isErrored?: boolean
}>()
const emit = defineEmits<{
  (e: 'change', files: FileWithContent[]): void
}>()

const fileInputRef = shallowRef<HTMLInputElement | null>(null)
const fileInputKey = shallowRef(0)
const selectedFiles = shallowRef<File[]>([])
const filesContent = shallowRef<FileWithContent[]>([])
const isReading = shallowRef(false)

watch(filesContent, files => {
  emit('change', files)
})

const readFileContent = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsText(file, 'utf-8')
  })
}

watch(selectedFiles, async files => {
  isReading.value = true
  filesContent.value = await Promise.all(
    files.map(async file => ({
      filename: file.name,
      content: await readFileContent(file),
    })),
  )
  isReading.value = false
})

const onInput = () => {
  const files = fileInputRef.value?.files
  fileInputKey.value++
  if (!files) return

  selectedFiles.value = Array.from(files)
}
</script>

<template>
  <InputContainer :isErrored="isErrored">
    <input
      v-show="false"
      :key="fileInputKey"
      ref="fileInputRef"
      type="file"
      :multiple="props.isMultiple"
      @input="onInput"
    />
    <TheTag class="picker-button" @click="fileInputRef?.click()">
      {{ props.isMultiple ? 'Selectează fișiere...' : 'Selectează fișier...' }}
    </TheTag>
    <slot />
    <IconLoadingSpinning v-if="isReading" />
    <div v-else-if="filesContent.length === 0" class="placeholder">Nici un fișier selectat</div>

    <Tooltip v-else-if="props.isMultiple">
      <div>{{ filesContent.length }} {{ filesContent.length === 1 ? 'fișier' : 'fișiere' }}</div>

      <template #popper>
        <div v-for="(file, index) in filesContent" :key="index">{{ file.filename }}</div>
      </template>
    </Tooltip>
    <div v-else>
      {{ filesContent[0].filename }}
    </div>
  </InputContainer>
</template>

<style lang="scss" scoped>
.picker-button {
  cursor: pointer;
}

.placeholder {
  color: var(--color-placeholder);
}
</style>
