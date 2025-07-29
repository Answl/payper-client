<script setup lang="ts">
import type { Partner } from "@/types/Partner";

const { partner } = defineProps<{
  partner: Partner;
}>();
</script>

<template>
  <div>
    <h1 class="text-xl font-bold">{{ partner.name }}</h1>
  </div>
</template>
