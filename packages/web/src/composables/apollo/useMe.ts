import { computed } from 'vue'

import { useGoogleToken } from '@/composables/useGoogleToken'
import { useMeQuery } from '@/generated/graphql'

export function useMe() {
  const query = useMeQuery()
  const googleToken = useGoogleToken()

  const isAuthenticated = computed(() => (query.loading.value ? null : Boolean(query.result.value?.me)))
  const logOut = () => {
    googleToken.value = null
  }

  return {
    ...query,
    isAuthenticated,
    logOut,
  }
}
