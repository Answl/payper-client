<script setup lang="ts">
import BrandLogo from "@/assets/BrandLogo.vue";
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
      router.push("/agree");
    }
  }
});
</script>

<template>
  <div class="flex flex-col py-20 h-full items-center justify-center">
    <div class="flex flex-col size-full items-center justify-center">
      <BrandLogo />
      <div class="flex mt-[-20px]">
        <span class="text-2xl font-bold mt-4 text-primary">pay</span>
        <span class="text-2xl font-bold mt-4">per</span>
      </div>
    </div>
    <div class="flex flex-col">
      <KakaoLoginButton />
    </div>
  </div>
</template>
