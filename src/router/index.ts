import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import ScheduleView from '@/views/ScheduleView.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Schedule',
    component: ScheduleView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

