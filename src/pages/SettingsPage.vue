<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const onClick = () => {
  router.push("/logout");
};
</script>

<template>
  <div>
    <button data-testid="LogoutButtonTest" @click="onClick">로그아웃</button>
  </div>
</template>
