<script setup lang="ts">
import { RouterView } from 'vue-router'

import TheFooter from '@/components/navbar/TheFooter.vue'
import TheNavbar from '@/components/navbar/TheNavbar.vue'
</script>

<template>
  <div class="app">
    <div class="navbar">
      <TheNavbar />
    </div>
    <div class="content">
      <div class="content-wrapper">
        <RouterView />
      </div>
    </div>
    <div class="footer">
      <TheFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  background: var(--color-background);

  > .navbar {
    flex: 0 0 auto;
    height: 55px;
  }

  > .footer {
    flex: 0 0 auto;
    height: 55px;
  }

  > .content {
    flex: 1 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    > .content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding: 48px 0px;
      gap: 16px;

      width: 1200px;
    }
  }
}
</style>
