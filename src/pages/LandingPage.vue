<script setup lang="ts">
import KakaoLoginButton from "@/components/KakaoLoginButton.vue";
import { useMeQuery } from "@/composables/user.query";
import { useAuthStore } from "@/stores/authStore";
import { getAccessToken } from "@/utils/storage";
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const accessToken = getAccessToken();
const redirect = route.query.redirect;

const { isSuccess } = useMeQuery({
  enabled: !authStore.isAuthenticated && accessToken !== null,
});

watchEffect(() => {
  if (accessToken && isSuccess && !authStore.isAuthenticated) {
    authStore.authenticate();
    if (typeof redirect === "string") {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }
});
</script>

<template>
  <div>
    <KakaoLoginButton />
  </div>
</template>
