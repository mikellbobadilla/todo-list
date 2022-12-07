import { createApp } from 'vue'
import { router } from './routes.js'
import App from './App.vue'

import './assets/main.css'

createApp(App).use(router).mount('#app')
