<script setup lang="ts">
const props = defineProps<{
  theme?: 'primary'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()
</script>

<template>
  <button class="the-button" :class="props.theme ?? 'primary'" :type="props.type" :disabled="props.disabled">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.the-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 24px;
  gap: 8px;
  border-radius: 8px;
  height: 40px;
  transition: background-color 0.1s ease-in-out;
  cursor: pointer;

  &:not(:disabled) {
    &.primary {
      background-color: var(--color-primary);
      color: var(--color-text-on-primary);

      &:hover {
        background-color: var(--color-primary-hover);
      }
    }
  }

  &:disabled {
    background-color: var(--color-disabled);
    color: var(--color-text-on-disabled);
    cursor: not-allowed;
  }
}
</style>
