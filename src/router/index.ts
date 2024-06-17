import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '@/views/WelcomePage.vue'
import LotteryPage from '@/views/LotteryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: LotteryPage
    }
  ]
})

export default router
