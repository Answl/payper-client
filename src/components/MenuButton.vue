<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import CommonButton from "./ui/button/CommonButton.vue";

import { defineProps, type FunctionalComponent } from "vue";

const props = defineProps<{
  label: string;
  icon: FunctionalComponent;
  onClick: () => void;
}>();
</script>

<template>
  <CommonButton
    @click="onClick"
    class="flex w-full py-6 text-neutral-800 bg-neutral-100 items-center justify-between"
  >
    <div class="flex items-center space-x-2">
      <component :is="props.icon" />
      <span>{{ props.label }}</span>
    </div>
    <ChevronRight />
  </CommonButton>
</template>
