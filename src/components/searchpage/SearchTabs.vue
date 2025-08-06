<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";

const { tabs } = defineProps<{
  tabs: { label: string; path: string }[];
}>();

const router = useRouter();
const route = useRoute();

const isActive = (path: string) => route.path === path;
</script>

<template>
  <div class="flex gap-6 pl-10 mb-4">
    <button
      v-for="tab in tabs"
      :key="tab.path"
      @click="router.push(tab.path)"
      :class="[
        'bg-transparent outline-none text-xl px-0 pb-1 font-normal transition-all duration-150 ease-in-out',
        isActive(tab.path)
          ? 'text-black font-bold border-b-2 border-black'
          : 'text-gray-300 hover:text-black hover:border-b-2 hover:border-black',
      ]"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
