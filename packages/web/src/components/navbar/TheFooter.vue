<template>
  <div class="footer-container">
    <div class="inner">
      <RouterLink to="/privacy-policy">Politica de Confidențialitate</RouterLink>
      <RouterLink to="/changelog">Jurnalul de modificări</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  background: var(--color-background-block);
  border-top: 1px solid var(--color-border);
  height: 100%;
  display: flex;
  justify-content: center;

  .inner {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 24px;
    width: 100%;
    max-width: 1200px;
    height: 100%;

    > a {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px;
      height: 24px;
      cursor: pointer;
      font-size: var(--font-size-tag);

      border-bottom: 1px solid var(--color-transparent);

      &:hover {
        border-bottom-color: var(--color-primary-hover);
      }

      &.router-link-active {
        border-bottom-color: var(--color-primary);
      }
    }
  }
}
</style>
