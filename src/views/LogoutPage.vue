<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(async () => {
  //로그아웃 진행

  //리다이렉트
  router.replace("/landing");
});
</script>

<template>
  <div>로그아웃 중~</div>
</template>
