<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { CommonButton } from "./button";

const { title } = defineProps<{
  title: string;
}>();

const router = useRouter();
</script>

<template>
  <div class="flex w-full h-[64px] justify-between items-center p-20">
    <CommonButton variant="ghost" @click="router.back()">
      <ChevronLeft />
    </CommonButton>
    <p>{{ title }}</p>
    <div class="opacity-0"><ChevronLeft /></div>
  </div>
</template>
