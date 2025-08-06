<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Partner } from "@/types/Partner";
import { getAllPartners } from "@/api/partner.api";

import BottomNavigation from "@/components/common/BottomNavigation.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import FilterDrawer from "@/components/search/SelectDrawerButton.vue";
import SearchTabs from "@/components/searchpage/SearchTabs.vue";
import SearchInput from "@/components/searchpage/SearchInput.vue";
import SelectedTags from "@/components/searchpage/SelectedTags.vue";
import PartnerList from "@/components/searchpage/PartnerList.vue";
import type { PartnerResponse } from "@/types/PartnerSearchResponse";

const route = useRoute();
const isPartnerSearch = computed(() => route.path.includes("/search/partners"));

const tabs = [
  { label: "신용카드", path: "/search/credit" },
  { label: "체크카드", path: "/search/check" },
  { label: "가맹점", path: "/search/partners" },
];

const searchQuery = ref("");
const selectedTags = ref<string[]>([]);
const partners = ref<Partner[]>([]);
const loading = ref(false);

const benefitOptions = ["편의점", "카페", "영화", "도서", "생활", "식비", "쇼핑", "뷰티"];

const clearFilters = () => {
  selectedTags.value = [];
};

const removeTag = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
};

const filteredPartners = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  const filtered = partners.value.filter((partner) => {
    const fields = [partner.name, partner.category?.name, partner.position?.placeName].filter(
      (v): v is string => typeof v === "string"
    );

    const matchQuery = !query || fields.some((text) => text.toLowerCase().includes(query));

    const matchTags = selectedTags.value.every((tag) => fields.some((text) => text.includes(tag)));

    return matchQuery && matchTags;
  });

  return filtered;
});

onMounted(async () => {
  loading.value = true;
  try {
    const res: PartnerResponse[] = await getAllPartners();

    partners.value = res.map(
      (item): Partner => ({
        id: item.id,
        name: item.name,
        imageUrl: item.partnerImageUrl ?? "",
        category: {
          id: item.categoryId,
          name: item.categoryName,
          imageUrl: item.categoryImageUrl ?? "",
        },
        position: undefined,
        myCards: [],
      })
    );
  } catch (e) {
    console.error("가맹점 불러오기 실패:", e);
    partners.value = [];
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
          class="text-sm text-stone-500 underline ml-auto hover:text-black"
          @click="clearFilters"
        >
          초기화
        </button>
      </div>

      <SelectedTags
        v-if="selectedTags.length"
        :tags="selectedTags"
        @remove="removeTag"
        @clear="clearFilters"
      />

      <div class="px-10 my-4">
        <hr class="border-t-2 border-stone-300" />
      </div>
      <PartnerList :partners="filteredPartners" />
    </main>

    <div class="fixed bottom-0 left-0 right-0 z-10">
      <BottomNavigation selected="search" />
    </div>
  </div>
</template>
