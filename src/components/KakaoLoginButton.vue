<script setup lang="ts">
const REDIRECT_URI = "http://localhost:5173/auth/callback/kakao";
const CLIENT_ID = "aca0b6bad9587b8d156c8ee39bda1ce7";
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
  <button data-testid="kakao-login-button" @click="onClick">카카오톡으로 계속하기</button>
</template>
