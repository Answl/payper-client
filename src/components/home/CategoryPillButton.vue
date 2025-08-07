<script setup lang="ts">
import type { CategoryPill } from "@/types/CategoryPill";
import CommonButton from "../ui/button/CommonButton.vue";

const props = defineProps<{
  pill: CategoryPill;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: "click", pill: CategoryPill): void;
}>();

const handleClick = () => {
  emit("click", props.pill);
};
</script>

<template>
  <CommonButton
    @click="handleClick"
    :class="[
      'rounded-full mb-5 bg-white text-stone-900 gap-1 z-10 shadow-lg transition-shadow duration-200 hover:text-white',
      selected ? 'bg-primary text-white' : '',
    ]"
  >
    <component
      :is="pill.icon"
      class="w-4 h-4"
      :class="pill.color ?? (selected ? 'text-white' : 'text-stone-900')"
    />
    {{ pill.label }}
  </CommonButton>
</template>
