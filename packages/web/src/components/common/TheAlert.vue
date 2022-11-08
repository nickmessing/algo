<script setup lang="ts">
const props = defineProps<{
  message: string | string[]
  type: 'error'
}>()
</script>

<template>
  <div class="alert" :class="props.type">
    <div class="message">
      <template v-if="Array.isArray(props.message)">
        <div v-for="string in props.message" :key="string">
          {{ string }}
        </div>
      </template>
      <template v-else>
        {{ props.message }}
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--color-alert-text);
  border: 1px solid;

  &.error {
    background-color: var(--color-alert-error-background);
    border-color: var(--color-alert-error-border);
  }
}
</style>
