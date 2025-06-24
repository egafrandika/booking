// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Booking from '@/views/BookingPage.vue'
import Home from '@/views/HomePage.vue'
import Menu from '@/views/MenuPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: Booking },
  { path: '/menu', name: 'Menu', component: Menu },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
