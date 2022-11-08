<script lang="ts" setup>
import IconLoading from './IconLoading.vue'
</script>

<template>
  <div class="icon-loading-spinning">
    <IconLoading />
  </div>
</template>

<style lang="scss" scoped>
.icon-loading-spinning {
  animation: spin 0.7s linear infinite;
  width: var(--icon-size);
  height: var(--icon-size);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
