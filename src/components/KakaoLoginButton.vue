<script setup lang="ts">
import KakaoIcon from "@/assets/KakaoIcon.vue";
import CommonButton from "./ui/button/CommonButton.vue";

const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const CLIENT_ID  = import.meta.env.VITE_KAKAO_CLIENT_ID;

// const REDIRECT_URI = "http://localhost:5173/auth/callback/kakao";
// const CLIENT_ID = "aca0b6bad9587b8d156c8ee39bda1ce7";
const KAKAO_AUTH_URL =
  "https://kauth.kakao.com/oauth/authorize?" +
  `client_id=${CLIENT_ID}` +
  `&redirect_uri=${REDIRECT_URI}` +
  "&response_type=code";
const onClick = () => {
  window.location.assign(KAKAO_AUTH_URL);
};
</script>

<template>
  <CommonButton
    data-testid="kakao-login-button"
    @click="onClick"
    class="bg-[#FEE500] text-stone-900 hover:bg-[#FEE500] hover:text-stone-900 active:bg-[#FEE500] active:text-stone-900"
  >
    <KakaoIcon />
    <span class="font-bo"> 카카오톡으로 계속하기 </span>
  </CommonButton>
</template>
