import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home.vue";
const ChartDemo = () => import("../components/ChartDemo.vue");
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/chart",
    component: ChartDemo,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
