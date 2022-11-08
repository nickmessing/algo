<script setup lang="ts">
const props = defineProps<{
  isErrored?: boolean
}>()
</script>

<template>
  <div class="tag" :class="{ errored: props.isErrored }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.tag {
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 27px;
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: var(--font-size-tag);
  color: var(--color-text);
  white-space: nowrap;

  &.errored {
    border-color: var(--color-alert-error-border);
    background-color: var(--color-alert-error-background);
  }
}
</style>
