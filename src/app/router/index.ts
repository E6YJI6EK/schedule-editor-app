import ScheduleScreen from "@/screens/schedule/view.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/schedule" },
  { path: "/schedule", name: "Schedule", component: ScheduleScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
