import { createRouter, createWebHistory } from 'vue-router'
import MainBlog from '../pages/MainBlog.vue'
import RecordInfo from '../pages/RecordInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainBlog
    },
    {
      path: '/RecordInfo',
      name: 'RecordInfo',
      component: RecordInfo
    }
  ]
})

export default router
