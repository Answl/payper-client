<script setup lang="ts">
import { Search } from "lucide-vue-next";

const { modelValue } = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search"): void;
}>();
</script>

<template>
  <div class="mb-4 px-10">
    <div class="flex items-center w-full border rounded overflow-hidden">
      <input
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keydown.enter="emit('search')"
        type="text"
        :placeholder="placeholder || '검색어를 입력하세요'"
        class="flex-1 px-4 py-2 text-sm focus:outline-none"
      />
      <button class="px-3 h-full text-gray-400 hover:text-black" @click="emit('search')">
        <Search class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
