<script setup lang="ts">
import { defineProps } from "vue";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-vue-next";

const props = defineProps<{
  placeholder?: string;
  onClick: () => void;
}>();

const keyword = defineModel<string>();
</script>

<template>
  <div class="flex relative w-full items-center">
    <Input
      v-model="keyword"
      type="text"
      :placeholder="props.placeholder ?? '검색어를 입력하세요'"
      class="w-full px-[20px] py-7 border-0 rounded-2xl bg-neutral-100"
    />
    <span @click="onClick" class="absolute end-3 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
