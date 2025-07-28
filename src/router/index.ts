import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import { useAuthStore } from "@/stores/authStore";
import MyCardPage from "@/pages/MyCardPage.vue";
import CardListPage from "@/pages/CardListPage.vue";
import KakaoCallbackPage from "@/pages/KakaoCallbackPage.vue";
import CardDetailsPage from "@/pages/CardDetailsPage.vue";
import HomePage from "@/pages/HomePage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import LogoutPage from "@/pages/LogoutPage.vue";
import BenefitDetailsPage from "@/pages/BenefitDetailsPage.vue";
import PartnerDetailsPage from "@/pages/PartnerDetailsPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: { requiresAuth: true },
    },
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
      meta: { requiresAuth: true },
    },
    {
      path: "/cards",
      name: "cardList",
      component: CardListPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/cards/:id",
      name: "cardDetails",
      component: CardDetailsPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/partners/:id",
      name: "partnerDetails",
      component: PartnerDetailsPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth/callback/kakao",
      name: "kakaoCallback",
      component: KakaoCallbackPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/cards/:cardId/benefits/:benefitId",
      name: "benefitDetails",
      component: BenefitDetailsPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profiles",
      component: ProfilePage,
      meta: { requiresAuth: true },
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
