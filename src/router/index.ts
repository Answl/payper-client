import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CardsPage from "@/views/CardsPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/landing",
      name: "landing",
      component: LandingPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/cards",
      component: CardsPage,
    },
  ],
});

router.beforeEach((to) => {
  const { isAuthenticated } = useAuthStore();
  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      path: "/landing",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
