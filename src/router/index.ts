import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import { useAuthStore } from "@/stores/authStore";
import MyCardPage from "@/pages/MyCardPage.vue";
import CardListPage from "@/pages/CardListPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/landing",
      name: "landing",
      component: LandingPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/my/cards",
      name: "myCards",
      component: MyCardPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/cards",
      component: CardListPage,
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
