<script setup lang="ts">
import { useMeQuery } from "@/composables/useMeQuery";
import { useAuthStore } from "@/stores/authStore";
import { getAccessToken } from "@/utils/storage";
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const KAKAO_AUTH_URL = "";
const router = useRouter();
const route = useRoute();
const { isAuthenticated, authenticate } = useAuthStore();
const accessToken = getAccessToken();
const redirect = route.query.redirect;

const { isSuccess } = useMeQuery({
  enabled: !isAuthenticated && accessToken !== null,
});

watchEffect(() => {
  if (accessToken && isSuccess && !isAuthenticated) {
    authenticate();
    if (typeof redirect === "string") {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }
});

const onKakaoLoginClick = () => {
  window.location.assign(KAKAO_AUTH_URL);
};
</script>

<template>
  <div>
    <button data-testid="kakao-login-button" @click="onKakaoLoginClick">카카오톡으로 로그인</button>
  </div>
</template>
