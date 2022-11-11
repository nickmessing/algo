<script setup lang="ts">
import { useMe } from '@/composables/apollo/useMe'

const { isAuthenticated, logOut, result } = useMe()
</script>

<template>
  <div class="menu">
    <RouterLink to="/">Probleme</RouterLink>
    <RouterLink v-if="result?.me?.canCreateTasks" to="/new-task">Adăugare problemă</RouterLink>
    <RouterLink to="/users">Utilizatori</RouterLink>
    <RouterLink to="/privacy-policy">Politica de Confidențialitate</RouterLink>
    <span v-if="isAuthenticated" @click="logOut">Ieșire</span>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;

  > a,
  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    height: 32px;
    cursor: pointer;
    font-size: var(--font-size-regular);

    border-bottom: 1px solid var(--color-transparent);

    &:hover {
      border-bottom-color: var(--color-primary-hover);
    }

    &.router-link-active {
      border-bottom-color: var(--color-primary);
    }
  }
}
</style>
