<script setup lang="ts">
const { tags } = defineProps<{
  tags: string[];
}>();

const emit = defineEmits<{
  (e: "remove", tag: string): void;
  (e: "clear"): void;
}>();
</script>

<template>
  <div v-if="tags.length" class="flex flex-wrap gap-2 mb-4 px-10 items-center">
    <span
      v-for="tag in tags"
      :key="tag"
      class="bg-red-400 text-white px-3 py-2 rounded-full text-xs flex items-center gap-1"
    >
      {{ tag }}
      <button
        class="ml-1 text-white hover:text-red-700 text-base leading-none"
        @click="emit('remove', tag)"
      >
        &times;
      </button>
    </span>

    <button class="text-sm text-stone-500 underline ml-auto" @click="emit('clear')">초기화</button>
  </div>
</template>
