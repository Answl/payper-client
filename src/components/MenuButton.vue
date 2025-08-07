<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import { defineProps, type Component } from "vue";
import CommonButton from "./ui/button/CommonButton.vue";

const props = defineProps<{
  label: string;
  icon: Component;
  onClick: () => void;
}>();
</script>

<template>
  <CommonButton
    @click="onClick"
    class="flex p-6 text-stone-900 bg-stone-100 items-center justify-between hover:bg-stone-200"
  >
    <div class="flex items-center gap-2">
      <component :is="props.icon" />
      <span>{{ props.label }}</span>
    </div>
    <ChevronRight />
  </CommonButton>
</template>
