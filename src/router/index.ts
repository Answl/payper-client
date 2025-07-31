import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import { useAuthStore } from "@/stores/authStore";
import MyCardPage from "@/pages/MyCardPage.vue";
import KakaoCallbackPage from "@/pages/KakaoCallbackPage.vue";
import CardDetailsPage from "@/pages/CardDetailsPage.vue";
import HomePage from "@/pages/HomePage.vue";
import SettingsPage from "@/pages/MorePage.vue";
import LogoutPage from "@/pages/LogoutPage.vue";
import PartnerDetailsPage from "@/pages/PartnerDetailsPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import TestPage from "@/pages/TestPage.vue";
import CreditSearchPage from "@/pages/search/CreditSearchPage.vue";
import CheckSearchPage from "@/pages/search/CheckSearchPage.vue";
import PartnerSearchPage from "@/pages/search/PartnerSearchPage.vue";
import AgreePage from "@/pages/AgreePage.vue";

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
      path: "/cards",
      redirect: "/cards/me",
    },
    {
      path: "/cards/me",
      name: "myCards",
      component: MyCardPage,
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
      path: "/more",
      name: "more",
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
      path: "/profile",
      name: "profiles",
      component: ProfilePage,
      meta: { requiresAuth: true },
    },
    {
      path: "/test",
      name: "test",
      component: TestPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/search",
      redirect: "/search/credit",
    },
    {
      path: "/search/credit",
      name: "searchCredit",
      component: CreditSearchPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/search/check",
      name: "searchCheck",
      component: CheckSearchPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/search/partners",
      name: "searchPartners",
      component: PartnerSearchPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/agree",
      name: "doYouAgree",
      component: AgreePage,
      meta: { requiresAuth: false },
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
