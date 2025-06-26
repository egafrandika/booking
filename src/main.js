import './assets/global.scss'

import { createApp } from 'vue'
import App from './App.vue'
import NavBar from './components/NavBar.vue'

import '@fontsource/rubik-doodle-shadow'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoDinner, MdDinnerdining, GiOnigori, MdFastfood } from 'oh-vue-icons/icons'

addIcons(CoDinner, MdDinnerdining, GiOnigori, MdFastfood)

import router from './router'

const app = createApp(App)
app.component('NavBar', NavBar)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
