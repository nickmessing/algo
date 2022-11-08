<script setup lang="ts">
import type { Example } from '@/generated/graphql'

const props = defineProps<{
  examples: Pick<Example, '__typename' | 'id' | 'input' | 'output'>[]
}>()
</script>

<template>
  <div v-for="example in props.examples" :key="example.id" class="task-example-row">
    <div class="column input">
      <div class="title">Intrare:</div>
      <div class="content" v-text="example.input" />
    </div>
    <div class="column output">
      <div class="title">Ieșire:</div>
      <div class="content" v-text="example.output" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-example-row {
  --row-gap: 16px;

  display: flex;
  flex-direction: row;
  gap: var(--row-gap);

  .column {
    display: flex;
    flex-direction: column;
    padding: 8px;
    gap: 8px;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    align-self: stretch;
    width: calc((100% - var(--row-gap)) / 2);

    .title {
      font-size: var(--font-size-regular);
      color: var(--color-faded);
    }

    .content {
      font-family: var(--font-family-mono);
      white-space: pre-wrap;
    }
  }
}
</style>
