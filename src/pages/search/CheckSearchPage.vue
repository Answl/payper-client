<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { searchCards } from "@/api/card.api";
import type { Card } from "@/types/Card";

import BottomNavigation from "@/components/common/BottomNavigation.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import SearchTabs from "@/components/searchpage/SearchTabs.vue";
import SearchInput from "@/components/searchpage/SearchInput.vue";
import FilterSection from "@/components/searchpage/FilterSection.vue";
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
const selectedBenefits = ref<string[]>([]);
const selectedCompanies = ref<string[]>([]);
const sortOption = ref("benefit");
const cards = ref<Card[]>([]);
const loading = ref(false);
const expandedBenefits = ref<Record<number, boolean>>({});

const benefitOptions = [
  "편의점",
  "카페",
  "영화관",
  "미용/뷰티",
  "주유",
  "대중교통",
  "쇼핑",
  "여행/항공",
  "배달",
  "간편결제",
  "마트",
  "디지털구독",
];

const selectedTags = computed(() => [...selectedBenefits.value, ...selectedCompanies.value]);

const handleSearch = () => {
  console.log("검색어:", searchQuery.value);
};

const clearFilters = () => {
  selectedBenefits.value = [];
  selectedCompanies.value = [];
};

const removeTag = (tag: string) => {
  selectedBenefits.value = selectedBenefits.value.filter((t) => t !== tag);
  selectedCompanies.value = selectedCompanies.value.filter((t) => t !== tag);
};

const toggleBenefit = (cardId: number) => {
  expandedBenefits.value[cardId] = !expandedBenefits.value[cardId];
};

const goToDetail = (id: number) => {
  router.push({ name: "cardDetails", params: { id } });
};

const fetchCards = async () => {
  loading.value = true;
  try {
    const res = await searchCards({
      name: searchQuery.value,
      type: "CHECK",
    });
    cards.value = res.cards ?? [];
  } catch (e) {
    console.error("카드 불러오기 실패:", e);
    cards.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCards();
});

watch([searchQuery, sortOption], () => {
  fetchCards();
});

const filteredCards = computed(() => {
  return cards.value.filter((card) => {
    const companyMatch =
      selectedCompanies.value.length === 0 ||
      selectedCompanies.value.includes(card.company?.name ?? "");

    const benefitMatch =
      selectedBenefits.value.length === 0 ||
      (card.benefits?.some((b) => selectedBenefits.value.includes(b.categories?.[0]?.name ?? "")) ??
        false);

    return companyMatch && benefitMatch;
  });
});
</script>
<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <CommonHeader title="검색" />

    <main class="flex-1 overflow-y-auto pb-[5.5rem] scrollbar-hide">
      <SearchTabs :tabs="tabs" />

      <SearchInput
        v-model="searchQuery"
        :placeholder="isPartnerSearch ? '가맹점명으로 검색' : '카드명으로 검색'"
        @search="handleSearch"
      />

      <FilterSection
        v-model:benefits="selectedBenefits"
        v-model:companies="selectedCompanies"
        :benefitOptions="benefitOptions"
        @clear="clearFilters"
      />

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
