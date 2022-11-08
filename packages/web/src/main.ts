import { DefaultApolloClient } from '@vue/apollo-composable'
import 'floating-vue/dist/style.css'
import { createApp, provide, h } from 'vue'

import { apolloClient } from './apollo'
import App from './App.vue'
import './assets/main.scss'
import { router } from './router'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(router)

app.mount('#app')
