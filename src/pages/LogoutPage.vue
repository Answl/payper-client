<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { removeAccessToken } from "@/utils/storage";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  //로그아웃 진행
  authStore.logOut();

  removeAccessToken();

  await axios.post("/logout"); //임시 URL

  //리다이렉트
  router.replace("/");
});
</script>

<template>
  <div>로그아웃 중~</div>
</template>
