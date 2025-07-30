<script setup lang="ts">
import { ref } from "vue";
import SearchBar from "../common/SearchBar.vue";
import CommonButton from "../ui/button/CommonButton.vue";
import type { CategoryPill } from "@/types/CategoryPill";
import { BookOpen, Coffee, Store } from "lucide-vue-next";

const { onSubmit } = defineProps<{
  onSubmit: (value: string) => void;
}>();

const keyword = ref<string>("");

const pills: CategoryPill[] = [
  {
    icon: Store,
    label: "편의점",
  },
  {
    icon: Coffee,
    label: "카페",
  },
  {
    icon: BookOpen,
    label: "서점",
  },
];

const handleSearch = () => {
  onSubmit(keyword.value);
};

const onCategoryClick = (pill: CategoryPill) => {
  keyword.value = pill.label;
  onSubmit(keyword.value);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <SearchBar v-model="keyword" placeholder="가맹점 ∙ 카테고리 검색" :onClick="handleSearch" />
    <div class="flex overflow-auto gap-2">
      <CommonButton
        v-for="(pill, index) in pills"
        :key="index"
        variant="outline"
        @click="() => onCategoryClick(pill)"
        class="rounded-full gap-1"
      >
        <component :is="pill.icon" class="w-4 h-4" />
        {{ pill.label }}
      </CommonButton>
    </div>
  </div>
</template>
