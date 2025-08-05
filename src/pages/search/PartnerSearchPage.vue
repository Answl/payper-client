<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Search } from "lucide-vue-next";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import FilterDrawer from "@/components/search/SelectDrawerButton.vue";
import type { Card } from "@/types/Card";
import { getAllCards } from "@/api/card.api";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CardItem from "@/components/cardlist/CardItem.vue";

const router = useRouter();
const route = useRoute();
const tabs = [
  { label: "신용카드", path: "/search/credit" },
  { label: "체크카드", path: "/search/check" },
  { label: "가맹점", path: "/search/partners" },
];
const isActive = (path: string) => route.path === path;

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

const filteredCards = computed(() =>
  cards.value.filter((card) => {
    const query = searchQuery.value.trim().toLowerCase();
    const benefits = card.benefits ?? [];
    const fields = [
      card.name,
      card.company?.name,
      ...benefits.map((b) => b.summary),
      ...benefits.flatMap((b) => b.partners?.map((p) => p.name) ?? []),
    ].filter(Boolean);

    const matchQuery = !query || fields.some((text) => text.toLowerCase().includes(query));
    const matchTags = selectedTags.value.every((tag) => fields.some((text) => text.includes(tag)));
    return matchQuery && matchTags;
  })
);

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

    <main class="flex-1 overflow-y-auto">
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

      <div class="mb-4 px-10">
        <div class="flex items-center w-full border rounded overflow-hidden">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="가맹점명으로 검색"
            class="flex-1 px-4 py-2 text-sm focus:outline-none"
          />
          <div class="px-3 h-full text-gray-400">
            <Search class="w-5 h-5" />
          </div>
        </div>
      </div>

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

      <div v-if="selectedTags.length" class="flex flex-wrap gap-2 mb-4 px-10 items-center">
        <span
          v-for="tag in selectedTags"
          :key="tag"
          class="bg-red-400 text-white px-3 py-2 rounded-full text-xs flex items-center gap-1"
        >
          {{ tag }}
          <button
            class="ml-1 text-white hover:text-red-700 text-base leading-none"
            @click="removeTag(tag)"
          >
            &times;
          </button>
        </span>

        <button
          class="text-sm text-gray-500 underline ml-auto hover:text-black"
          @click="clearFilters"
        >
          초기화
        </button>
      </div>

      <div class="border-b border-gray-200 mx-10 mb-4 mt-2"></div>
      <div class="flex justify-end mb-4 px-10">
        <select v-model="sortOption" class="border rounded px-2 py-1 text-sm">
          <option value="benefit">혜택 높은순</option>
          <option value="fee">연회비 낮은순</option>
        </select>
      </div>

      <Accordion type="single" collapsible class="space-y-4 px-10 pb-4">
        <AccordionItem
          v-for="card in filteredCards"
          :key="card.id"
          :value="String(card.id)"
          class="overflow-hidden"
        >
          <div class="w-[95%] mx-auto">
            <cardItem
              :card="card"
              :expanded="!!expandedBenefits[card.id]"
              :onToggle="() => toggleBenefit(card.id)"
              :onClick="() => goToDetail(card.id)"
            />
          </div>
        </AccordionItem>
      </Accordion>
    </main>
    <BottomNavigation selected="search" />
  </div>
</template>
