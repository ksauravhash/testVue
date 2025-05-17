import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import CheckoutView from "./components/CheckoutView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/checkout", component: CheckoutView },
];

const router = createRouter({ history: createWebHistory(), routes: routes });

export default router;
