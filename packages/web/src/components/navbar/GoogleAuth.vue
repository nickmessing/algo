<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

import { useGoogleToken } from '@/composables/useGoogleToken'
import { getGoogle } from '@/utils/getGoogle'

import type { CredentialResponse } from 'google-one-tap'

const googleAuth = shallowRef<HTMLDivElement | null>(null)
const googleToken = useGoogleToken()

const handleCredentialResponse = (response: CredentialResponse) => {
  googleToken.value = response.credential
}

onMounted(async () => {
  if (googleAuth.value == null) {
    return
  }

  const google = await getGoogle()

  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  })
  google.accounts.id.renderButton(googleAuth.value, { theme: 'outline', size: 'large' })
})
</script>

<template>
  <div ref="googleAuth" class="google-auth-container" />
</template>

<style lang="scss" scoped>
.google-auth-container {
  display: flex;
  justify-content: center;
}
</style>
