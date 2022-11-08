import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'

import { apolloClient } from '@/apollo'

// Keep a single reference to the token to be re-used by every component
export const googleTokenReference = useLocalStorage<null | string>('googleToken', null)

watch(googleTokenReference, () => {
  void apolloClient.resetStore()
})

export const useGoogleToken = () => googleTokenReference
