import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'schedule',
    component: () => import('@/pages/SchedulePage/SchedulePage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router


