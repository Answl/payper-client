<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loginWithKakao } from "@/api/auth.api";
import { setAccessToken } from "@/utils/storage";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  const code = route.query.code;
  if (typeof code !== "string") {
    router.push("/landing");
    return;
  }

  try {
    await attemptLogin(code);
    router.push("/");
  } catch (e) {
    console.error("LoginWithKakao failed: ", e);
    router.push("/landing");
  }
});

const attemptLogin = async (code: string) => {
  const data = await loginWithKakao({ code });
  setAccessToken(data.accessToken);
  authStore.authenticate();
};
</script>

<template>
  <div></div>
</template>
