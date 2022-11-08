<template>
  <div class="page-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  box-sizing: border-box;

  background: var(--color-background-block);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}
</style>
