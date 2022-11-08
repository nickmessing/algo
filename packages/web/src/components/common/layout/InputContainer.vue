<script setup lang="ts">
const props = defineProps<{
  isErrored?: boolean
}>()
</script>

<template>
  <div class="input-container" :class="{ errored: props.isErrored }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 12px;
  gap: 8px;
  height: 40px;
  width: 100%;
  background: var(--color-background-block);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: var(--font-size-regular);

  &.errored {
    border-color: var(--color-alert-error-border);
    background-color: var(--color-alert-error-background);
  }
}
</style>
