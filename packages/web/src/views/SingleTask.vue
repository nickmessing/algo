<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRoute } from 'vue-router'

import { useMe } from '@/composables/apollo/useMe'
import { useCreateTaskAttemptMutation, useSingleTaskQuery } from '@/generated/graphql'
import { languages } from '@/utils/languages'

import FileField from '../components/common/forms/FileField.vue'
import PageContainer from '../components/common/layout/PageContainer.vue'
import TheButton from '../components/common/TheButton.vue'
import TheTag from '../components/common/TheTag.vue'
import TaskAttempts from '../components/task/attempts/TaskAttempts.vue'
import TaskExamples from '../components/task/TaskExamples.vue'
import TaskSummary from '../components/task/TaskSummary.vue'
import IconLoadingSpinning from '../icons/IconLoadingSpinning.vue'

import type { FileWithContent } from '@/types/files'

const route = useRoute()

const taskId = computed(() => route.params.id as string)

const {
  result,
  loading: isQueryLoading,
  refetch,
} = useSingleTaskQuery(() => ({
  taskId: taskId.value,
}))
if (!isQueryLoading.value) {
  void refetch()
}

const { mutate, loading: isMutating } = useCreateTaskAttemptMutation({})

const { result: resultMe } = useMe()

const attemptFile = shallowRef<FileWithContent | null>(null)
const setSource = (files: FileWithContent[]) => {
  attemptFile.value = files[0] ?? null
}
const selectedLanguage = computed(() => {
  if (attemptFile.value == null) {
    return null
  }

  const extension = attemptFile.value.filename.split('.').pop() ?? ''

  return languages.find(language => language.extensions.includes(extension))
})

const upload = async () => {
  if (attemptFile.value == null || selectedLanguage.value == null || isMutating.value) {
    return
  }

  await mutate({
    taskId: taskId.value,
    input: {
      languageId: selectedLanguage.value.languageId,
      sourceCode: attemptFile.value.content,
    },
  })
}
</script>

<template>
  <PageContainer v-if="result?.task">
    <div class="page-flex">
      <TaskSummary :task="result.task" />

      <div class="task-description" :innerHTML="result.task.description" />

      <div class="section-title">Exemple</div>
      <TaskExamples :examples="result.task.examples" />

      <div class="section-title">
        <div>Limite</div>
        <TheTag>{{ result.task.timeLimit / 1000 }} s</TheTag>
        <TheTag>{{ result.task.memoryLimit / 1024 / 1024 }} MB</TheTag>
      </div>

      <template v-if="resultMe?.me">
        <div class="section-title">Încarcă soluție</div>
        <div class="attempt-upload">
          <div class="section">
            <FileField class="grow" @change="setSource" />
          </div>
          <div class="section">
            <TheTag v-if="selectedLanguage">
              {{ selectedLanguage.name }}
            </TheTag>
            <TheButton :disabled="!selectedLanguage || isMutating" @click="upload">
              Încarcă
              <IconLoadingSpinning v-if="isMutating" />
            </TheButton>
          </div>
        </div>
      </template>
    </div>
  </PageContainer>

  <TaskAttempts v-if="result?.task" :task="result.task" />
</template>

<style lang="scss" scoped>
.page-flex {
  .section-title {
    font-size: var(--font-size-heading);
    line-height: 34px;
    gap: 16px;
    display: flex;
    align-items: center;
  }

  .attempt-upload {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;

    .section {
      display: flex;
      flex-direction: row;
      gap: 16px;
      align-items: center;
      width: calc((100% - 16px) / 2);
    }
  }
}
</style>
