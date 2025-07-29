<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { CommonButton } from "./ui/button";

const { title } = defineProps<{
  title: string;
}>();

const router = useRouter();
</script>

<template>
  <div class="flex w-full justify-between items-center p-[20px]">
    <CommonButton variant="ghost" @click="router.back()">
      <ChevronLeft />
    </CommonButton>
    <p>{{ title }}</p>
    <CommonButton variant="ghost" class="invisible">
      <ChevronLeft />
    </CommonButton>
  </div>
</template>
