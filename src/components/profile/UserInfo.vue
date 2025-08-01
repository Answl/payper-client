<script setup lang="ts">
import type { User } from "@/types/User";

const { user } = defineProps<{
  user: User;
}>();
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">{{ user.nickname }}</h1>
  </div>
</template>
