import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./components/HomeView.vue";
import CheckoutView from "./components/CheckoutView.vue";
import RedditView from "./components/RedditView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/checkout", component: CheckoutView },
  { path: "/reddit", component: RedditView },
];

const router = createRouter({ history: createWebHistory(), routes: routes });

export default router;
