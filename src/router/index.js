import { createRouter, createWebHistory } from 'vue-router'
import Booking from '@/views/BookingPage.vue'
import Home from '@/views/HomePage.vue'
import Menu from '@/views/MenuPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/menu', name: 'Menu', component: Menu },
  { path: '/booking', name: 'Booking', component: Booking },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
