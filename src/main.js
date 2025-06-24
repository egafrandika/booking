import { createApp } from 'vue'
import App from './App.vue'
import NavBar from './components/NavBar.vue'

import router from './router'
const app = createApp(App)
app.component('NavBar', NavBar)
app.use(router)
app.mount('#app')
