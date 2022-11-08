<script setup lang="ts">
import { filesize } from 'filesize'
import { computed } from 'vue'

import { RunStatus, useRunUpdatedSubscription, type Run } from '@/generated/graphql'

import TheTag from '../../common/TheTag.vue'

import type { DeepPick } from '@/types/graphql'
const props = defineProps<{
  run: DeepPick<
    Run,
    {
      __typename: true
      id: true
      status: true
      time: true
      memory: true
    }
  >
}>()

useRunUpdatedSubscription(() => ({ runId: props.run.id }))

const isAccepted = computed(() => props.run.status === RunStatus.Accepted)
const isInProgress = computed(
  () =>
    props.run.status === RunStatus.InQueue ||
    props.run.status === RunStatus.Processing ||
    props.run.status === RunStatus.Pending,
)
const isErrored = computed(() => !isAccepted.value && !isInProgress.value)

const statusMessage = computed(() => {
  switch (props.run.status) {
    case RunStatus.Accepted:
      return 'Acceptat'
    case RunStatus.CompilationError:
      return 'Eroare la compilare'
    case RunStatus.ExecFormatError:
      return 'Eroare formatului de execuție'
    case RunStatus.InQueue:
      return 'În coadă'
    case RunStatus.InternalError:
      return 'Eroare internă'
    case RunStatus.Pending:
      return 'Se pregătește'
    case RunStatus.Processing:
      return 'Se procesează'
    case RunStatus.RuntimeErrorNzec:
      return 'Eroare de execuție (NZEC)'
    case RunStatus.RuntimeErrorSigabrt:
      return 'Eroare de execuție (SIGABRT)'
    case RunStatus.RuntimeErrorSigfpe:
      return 'Eroare de execuție (SIGFPE)'
    case RunStatus.RuntimeErrorSigsegv:
      return 'Eroare de execuție (SIGSEGV)'
    case RunStatus.RuntimeErrorSigxfsz:
      return 'Eroare de execuție (SIGXFSZ)'
    case RunStatus.TimeLimitExceeded:
      return 'Limita de timp depășită'
    case RunStatus.WrongAnswer:
      return 'Răspuns greșit'
    default:
      return 'Eroare de execuție (altă eroare)'
  }
})
const humanReadableMemory = computed(() => filesize(props.run.memory ?? 0, { base: 2, standard: 'jedec' }))
</script>

<template>
  <div
    class="attempt-run"
    :class="{
      processing: isInProgress,
      accepted: isAccepted,
      error: isErrored,
    }"
  >
    <div class="inner">
      <div class="side">
        <div>{{ statusMessage }}</div>
      </div>
      <div class="side">
        <TheTag v-if="props.run.time">{{ props.run.time / 1000 }}s</TheTag>
        <TheTag v-if="props.run.memory">{{ humanReadableMemory }}</TheTag>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.attempt-run {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  overflow: hidden;
  background: var(--color-background-block);

  &.processing {
    --status-color: var(--color-blue-45);
  }
  &.accepted {
    --status-color: var(--color-green-49);
  }
  &.error {
    --status-color: var(--color-red-58);
  }

  .inner {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-left: 5px solid var(--status-color);
    padding: 8px;

    .side {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 8px;
    }
  }
}
</style>
