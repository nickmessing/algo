<script setup lang="ts">
import { RouterLink } from 'vue-router'

import TheMenu from './TheMenu.vue'
import UserMenuSection from './UserMenuSection.vue'
</script>

<template>
  <div class="navbar-root">
    <div class="content">
      <div class="content-section">
        <RouterLink to="/" class="logo"> algo.nickmessing.com </RouterLink>
      </div>
      <div class="content-section">
        <TheMenu />
        <UserMenuSection />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-root {
  width: 100%;
  height: 100%;
  background: var(--color-background-block);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: center;

  > .content {
    width: 100%;
    max-width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    > .content-section {
      display: flex;
      align-items: center;
      height: 100%;
      display: flex;
      flex-direction: row;
      padding: 0px;
      gap: 32px;

      > .logo {
        font-weight: 300;
        font-size: var(--font-size-logo);
      }
    }
  }
}
</style>
