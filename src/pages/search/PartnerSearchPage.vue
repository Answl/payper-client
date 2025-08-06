<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { Card } from "@/types/Card";
import { getAllCards } from "@/api/card.api";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import FilterDrawer from "@/components/search/SelectDrawerButton.vue";

import SearchTabs from "@/components/searchpage/SearchTabs.vue";
import SearchInput from "@/components/searchpage/SearchInput.vue";
import SelectedTags from "@/components/searchpage/SelectedTags.vue";
import SortSelect from "@/components/searchpage/SortSelect.vue";
import CardAccordionList from "@/components/searchpage/CardAccordionList.vue";

const router = useRouter();
const route = useRoute();
const isPartnerSearch = computed(() => route.path.includes("/search/partners"));

const tabs = [
  { label: "신용카드", path: "/search/credit" },
  { label: "체크카드", path: "/search/check" },
  { label: "가맹점", path: "/search/partners" },
];

const searchQuery = ref("");
const selectedTags = ref<string[]>([]);
const sortOption = ref("benefit");
const cards = ref<Card[]>([]);
const loading = ref(false);
const expandedBenefits = ref<Record<number, boolean>>({});

const benefitOptions = ["편의점", "카페", "영화", "도서", "생활", "식비", "쇼핑", "뷰티"];

const clearFilters = () => {
  selectedTags.value = [];
};

const removeTag = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
};

const toggleBenefit = (cardId: number) => {
  expandedBenefits.value[cardId] = !expandedBenefits.value[cardId];
};

const goToDetail = (id: number) => {
  router.push({ name: "cardDetails", params: { id } });
};

const filteredCards = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  const filtered = cards.value.filter((card) => {
    const benefits = card.benefits ?? [];
    const fields = [
      card.name,
      card.company.name,
      ...benefits.map((b) => b.summary),
      ...benefits.flatMap((b) => b.categories.map((p) => p.name) ?? []),
    ].filter(Boolean);

    const matchQuery = !query || fields.some((text) => text.toLowerCase().includes(query));
    const matchTags = selectedTags.value.every((tag) => fields.some((text) => text.includes(tag)));
    return matchQuery && matchTags;
  });

  if (sortOption.value === "benefit") {
    return filtered.sort((a, b) => (b.benefits?.length || 0) - (a.benefits?.length || 0));
  }

  return filtered;
});

onMounted(async () => {
  loading.value = true;
  try {
    const res = await getAllCards();
    cards.value = res.cards ?? [];
  } catch (e) {
    console.error("카드 불러오기 실패:", e);
    cards.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col size-full">
    <CommonHeader title="검색" />

    <main class="flex-1 overflow-y-auto pb-[5.5rem] scrollbar-hide">
      <SearchTabs :tabs="tabs" />

      <SearchInput
        v-model="searchQuery"
        :placeholder="isPartnerSearch ? '가맹점명으로 검색' : '카드명으로 검색'"
      />
      <div class="flex flex-wrap gap-2 items-center mb-2 px-10">
        <FilterDrawer label="카테고리" :options="benefitOptions" v-model:selected="selectedTags" />
        <button
          v-if="!selectedTags.length"
          class="text-sm text-gray-500 underline ml-auto hover:text-black"
          @click="clearFilters"
        >
          초기화
        </button>
      </div>
      <SelectedTags :tags="selectedTags" @remove="removeTag" @clear="clearFilters" />
      <SortSelect v-model="sortOption" />

      <CardAccordionList
        :cards="filteredCards"
        :expandedMap="expandedBenefits"
        @toggle="toggleBenefit"
        @detail="goToDetail"
      />
    </main>
    <div class="fixed bottom-0 left-0 right-0 z-10">
      <BottomNavigation selected="search" />
    </div>
  </div>
</template>
