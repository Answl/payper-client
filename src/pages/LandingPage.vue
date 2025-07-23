<script setup lang="ts">
import { getMe } from "@/api/user.api";
import { useAuthStore } from "@/stores/authStore";
import { getAccessToken } from "@/utils/storage";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const KAKAO_AUTH_URL = "";
const router = useRouter();
const route = useRoute();
const { isAuthenticated, authenticate } = useAuthStore();

onMounted(async () => {
  const accessToken = getAccessToken();
  const redirect = route.query.redirect;
  if (!isAuthenticated && accessToken !== null) {
    await attemptAuthentication();
    if (typeof redirect === "string") {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }
});

const attemptAuthentication = async () => {
  await getMe();
  authenticate();
};

const onKakaoLoginClick = () => {
  window.location.assign(KAKAO_AUTH_URL);
};
</script>

<template>
  <div>
    <button data-testid="kakao-login-button" @click="onKakaoLoginClick">카카오톡으로 로그인</button>
  </div>
</template>
