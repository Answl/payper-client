<script setup lang="ts">
import { nextTick, ref } from "vue";
import SearchBar from "../common/SearchBar.vue";
import CommonButton from "../ui/button/CommonButton.vue";
import type { CategoryPill } from "@/types/CategoryPill";
import { BookOpen, Coffee, Store } from "lucide-vue-next";

const { onSubmit } = defineProps<{
  onSubmit: (value: string) => void;
}>();

const keyword = defineModel<string>("keyword", {
  default: "",
});

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

const selectedCategory = ref<string | null>(null);

const onCategoryClick = async (pill: CategoryPill) => {
  keyword.value = pill.label;
  selectedCategory.value = pill.label;
  await nextTick();
  handleSearch();
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <SearchBar v-model="keyword" placeholder="가맹점 ∙ 카테고리 검색" :onClick="handleSearch" />

    <!-- 카테고리 버튼 영역 -->
    <div class="flex overflow-y-visible gap-2 pb-1">
      <CommonButton
        v-for="(pill, index) in pills"
        :key="index"
        @click="onCategoryClick(pill)"
        :class="[
          'rounded-full bg-white text-stone-900 gap-1 z-10 shadow-lg transition-shadow duration-200 hover:text-white',
          selectedCategory === pill.label ? 'bg-primary text-white' : '',
        ]"
      >
        <component :is="pill.icon" class="w-4 h-4" />
        {{ pill.label }}
      </CommonButton>
    </div>
  </div>
</template>
