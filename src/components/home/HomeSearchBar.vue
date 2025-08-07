<script setup lang="ts">
import { nextTick, ref } from "vue";
import SearchBar from "../common/SearchBar.vue";
import type { CategoryPill } from "@/types/CategoryPill";
import {
  BookOpen,
  Coffee,
  Fuel,
  Popcorn,
  ShoppingBag,
  ShoppingCart,
  Store,
  Utensils,
} from "lucide-vue-next";
import CategoryPillButton from "./CategoryPillButton.vue";

const { onSubmit } = defineProps<{
  onSubmit: (value: string) => void;
}>();

const keyword = defineModel<string>("keyword", {
  default: "",
});

const scrollContainerRef = ref<HTMLElement | null>(null);

const pills: CategoryPill[] = [
  {
    icon: Utensils,
    label: "음식점",
    color: "text-orange-400",
  },
  {
    icon: Store,
    label: "편의점",
    color: "text-yellow-400",
  },
  {
    icon: Coffee,
    label: "카페",
    color: "text-amber-500",
  },
  {
    icon: BookOpen,
    label: "서점",
    color: "text-sky-400",
  },
  {
    icon: Popcorn,
    label: "영화관",
    color: "text-indigo-400",
  },
  {
    icon: ShoppingCart,
    label: "마트",
    color: "text-lime-500",
  },
  {
    icon: ShoppingBag,
    label: "백화점",
    color: "text-rose-400",
  },
  {
    icon: Fuel,
    label: "주유소",
    color: "text-slate-400",
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

const handleWheel = (event: WheelEvent) => {
  if (scrollContainerRef.value && Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    scrollContainerRef.value.scrollLeft += event.deltaY;
    event.preventDefault(); // 수직 스크롤 방지
  }
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <SearchBar v-model="keyword" placeholder="가맹점 ∙ 카테고리 검색" :onClick="handleSearch" />

    <!-- 카테고리 버튼 영역 -->
    <div
      ref="scrollContainerRef"
      style="-webkit-overflow-scrolling: touch"
      class="flex relative mb-10 scrollbar-hide overflow-y-visible overflow-x-auto scroll-smooth gap-2 pb-1 pr-24"
      @wheel="handleWheel"
    >
      <CategoryPillButton
        v-for="(pill, index) in pills"
        :key="index"
        :pill="pill"
        :selected="selectedCategory === pill.label"
        @click="onCategoryClick"
      />
    </div>
  </div>
</template>
