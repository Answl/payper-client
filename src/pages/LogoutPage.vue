<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { removeAccessToken } from "@/utils/storage";
import { useLogoutMutation } from "@/composables/auth.query";

const router = useRouter();
const authStore = useAuthStore();

const { mutate } = useLogoutMutation({
  onSuccess: () => {
    authStore.logOut();
    removeAccessToken();
    router.replace("/landing");
  },
  onError: (error) => {
    console.error("Logout failed:", error);
  },
});

onMounted(async () => {
  mutate();
});
</script>

<template>
  <div></div>
</template>
