import ScheduleView from "@/views/ScheduleView.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/schedule", name: "Schedule", component: ScheduleView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
