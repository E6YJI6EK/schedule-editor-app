import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import ScheduleView from '@/views/ScheduleView.vue';
import HomeAlive from '@/views/HomeAlive.vue';
import TeachersSearch from '@/views/TeachersSearch.vue';
import DisciplinesSearch from '@/views/DisciplinesSearch.vue';
import BuildingsSearch from '@/views/BuildingsSearch.vue';
import ClassRoomsSearch from '@/views/ClassRoomsSearch.vue';
import GroupsSearch from '@/views/GroupsSearch.vue';
import LessonCreateForm from '@/views/LessonCreateForm.vue';
import LessonUpdateForm from '@/views/LessonUpdateForm.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeAlive },
  { path: '/schedule', name: 'Schedule', component: ScheduleView },
  { path: '/search/teachers', name: 'TeachersSearch', component: TeachersSearch },
  { path: '/search/disciplines', name: 'DisciplinesSearch', component: DisciplinesSearch },
  { path: '/search/buildings', name: 'BuildingsSearch', component: BuildingsSearch },
  { path: '/search/class-rooms', name: 'ClassRoomsSearch', component: ClassRoomsSearch },
  { path: '/search/groups', name: 'GroupsSearch', component: GroupsSearch },
  { path: '/lessons/create', name: 'LessonCreate', component: LessonCreateForm },
  { path: '/lessons/update', name: 'LessonUpdate', component: LessonUpdateForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

