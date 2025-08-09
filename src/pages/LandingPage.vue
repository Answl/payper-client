<script setup lang="ts">
import BrandLogo from "@/assets/BrandLogo.vue";
import KakaoLoginButton from "@/components/KakaoLoginButton.vue";
import { useMeQuery } from "@/composables/user.query";
import { useAuthStore } from "@/stores/authStore";
import { getAccessToken } from "@/utils/storage";
import { watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

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

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    console.log("PWA 설치가 가능합니다.");

    // 0.5초 후 설치 팝업 호출
    setTimeout(() => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("사용자가 설치를 수락했습니다.");
          } else {
            console.log("사용자가 설치를 거부했습니다.");
          }
          deferredPrompt = null;
        });
      }
    }, 500);
  });
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
