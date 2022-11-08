<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import { computed, shallowRef } from 'vue'

import { AttemptStatus, useAttemptUpdatedSubscription, type Attempt } from '@/generated/graphql'
import { languages } from '@/utils/languages'
import { messages } from '@/utils/timeagoLocalization'

import IconChevronDown from '../../../icons/IconChevronDown.vue'
import IconChevronUp from '../../../icons/IconChevronUp.vue'
import TheTag from '../../common/TheTag.vue'
import UserAvatar from '../../common/user/UserAvatar.vue'

import AttemptDetails from './AttemptDetails.vue'

import type { DeepPick } from '@/types/graphql'

const props = defineProps<{
  attempt: DeepPick<
    Attempt,
    {
      __typename: true
      id: true
      status: true
      createdAt: true
      languageId: true
      user: {
        __typename: true
        avatar: true
        name: true
        email: true
      }
    }
  >
}>()

useAttemptUpdatedSubscription(() => ({ attemptId: props.attempt.id }))

const areDetailsVisible = shallowRef(false)

const timeAgo = useTimeAgo(() => props.attempt.createdAt, {
  messages,
})
const language = computed(() => languages.find(language => language.languageId === props.attempt.languageId))
const statusText = computed(() => {
  switch (props.attempt.status) {
    case AttemptStatus.Accepted:
      return 'Acceptat'
    case AttemptStatus.Error:
      return 'Eroare'
    default:
      return 'În curs de execuție'
  }
})
</script>

<template>
  <div
    class="attempt-row"
    :class="{
      processing: props.attempt.status === AttemptStatus.Processing,
      accepted: props.attempt.status === AttemptStatus.Accepted,
      error: props.attempt.status === AttemptStatus.Error,
    }"
    @click="areDetailsVisible = !areDetailsVisible"
  >
    <div class="inner">
      <div class="content">
        <div class="content-row">
          <div class="side">
            <UserAvatar :user="props.attempt.user" />
            <div class="small-text">
              {{ props.attempt.user.name ?? props.attempt.user.email }}
            </div>
            <div class="small-text">
              {{ timeAgo }}
            </div>
          </div>
          <div class="side">
            <TheTag>
              {{ language?.name ?? 'Compilator necunoscut' }}
            </TheTag>
          </div>
        </div>
        <div class="content-row">
          <div class="side">
            <div class="status-text">
              {{ statusText }}
            </div>
          </div>
          <div class="side">
            <div class="small-text">Detalii</div>
            <IconChevronUp v-if="areDetailsVisible" />
            <IconChevronDown v-else />
          </div>
        </div>
        <AttemptDetails v-if="areDetailsVisible" :attempt="props.attempt" @click.stop />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.attempt-row {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

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
    flex-direction: column;
    align-items: stretch;
    padding: 12px 16px;
    background: var(--color-background-block);
    border-left: 10px solid var(--status-color);

    .content {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 0px;
      gap: 16px;

      .content-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0px;

        .side {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 16px;

          .small-text {
            color: var(--color-faded);
            font-size: var(--font-size-regular);
          }

          .status-text {
            font-size: var(--font-size-large);
          }
        }
      }
    }
  }
}
</style>
