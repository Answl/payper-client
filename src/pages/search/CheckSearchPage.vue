<script setup lang="ts">
import { ref, computed, onMounted, type Component } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Coffee,
  FlaskConical,
  Film,
  BookOpen,
  ShoppingBag,
  Candy,
} from "lucide-vue-next";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import FilterDrawer from "@/components/search/SelectDrawerButton.vue";
import { getMyCards } from "@/api/mycard.api";
import type { Card } from "@/types/Card";

const router = useRouter();
const route = useRoute();
const goBack = () => router.back();

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

const benefitOptions = [
  "편의점", "카페", "영화관", "미용/뷰티", "주유", "대중교통",
  "쇼핑", "여행/항공", "배달", "간편결제", "마트", "디지털구독"
];

const iconMap: Record<string, Component> = {
  "편의점": ShoppingBag,
  "카페": Coffee,
  "헬스/뷰티": FlaskConical,
  "문화": Film,
  "도서": BookOpen,
  "생활": ShoppingBag,
  "식비": Candy,
};

const resolveIcon = (benefit: Card["benefits"][number]): Component => {
  const normalize = (str?: string) => str?.trim().toLowerCase() || "";
  const category = normalize(benefit.categories?.[0]?.name);
  const partner = normalize(benefit.partners?.[0]?.name);
  return iconMap[category] || iconMap[partner] || ShoppingBag;
};

const handleSearch = () => {
  console.log("검색어:", searchQuery.value);
};

const clearFilters = () => {
  selectedTags.value = [];
};

const removeTag = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
};

const toggleBenefit = (cardId: number) => {
  expandedBenefits.value[cardId] = !expandedBenefits.value[cardId];
};

const filteredCards = computed(() =>
  cards.value.filter((card) =>
    card.name.includes(searchQuery.value) &&
    selectedTags.value.every((tag) =>
      card.name.includes(tag) ||
      card.company?.name?.includes(tag) ||
      card.benefits?.some((b) => b.summary.includes(tag))
    )
  )
);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await getMyCards();
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

    <header class="flex items-center justify-between py-2 px-4">
      <button @click="goBack">
        <ArrowLeft class="w-6 h-6" />
      </button>
      <h1 class="text-lg font-semibold">검색</h1>
      <div class="w-6"></div>
    </header>

    <div class="flex gap-6 pl-10 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.path"
        @click="router.push(tab.path)"
        :class="[
          'bg-transparent outline-none text-xl px-0 pb-1 font-normal transition-all duration-150 ease-in-out',
          isActive(tab.path)
            ? 'text-black font-bold border-b-2 border-black'
            : 'text-gray-300 hover:text-black hover:border-b-2 hover:border-black'
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
          placeholder="카드명으로 검색"
          class="flex-1 px-4 py-2 text-sm focus:outline-none"
          @keydown.enter="handleSearch"
        />
        <button class="px-3 h-full text-gray-400 hover:text-black" @click="handleSearch">
          <Search class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2 items-center mb-2 px-10">
      <FilterDrawer
        label="혜택"
        :options="benefitOptions"
        v-model:selected="selectedTags"
      />
      <FilterDrawer
        label="카드사"
        :options="['KB국민카드', '신한카드', '우리카드']"
        v-model:selected="selectedTags"
      />
      <FilterDrawer
        label="전월실적"
        :options="['없음', '30만원 이상', '50만원 이상']"
        v-model:selected="selectedTags"
      />

      <button
        v-if="!selectedTags.length"
        class="text-sm text-gray-500 underline ml-auto"
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
        <button class="ml-1 text-white hover:text-red-700 text-base leading-none" @click="removeTag(tag)">
          &times;
        </button>
      </span>


      <button
        class="text-sm text-gray-500 underline ml-auto"
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


    <Accordion type="single" collapsible class="space-y-4 px-10">
      <AccordionItem
        v-for="card in filteredCards"
        :key="card.id"
        :value="String(card.id)"
        class="overflow-hidden"
      >
          <div class="w-[95%] mx-auto">
          <div class="px-4 py-4 flex cursor-pointer">
            <img :src="card.imageUrl" alt="카드 이미지" class="w-20 h-28 object-cover rounded-md" />
            <div class="ml-4 flex-1 mt-2">
              <p class="text-xs text-gray-500">{{ card.company?.name }}</p>
              <p class="text-sm text-gray-900 font-medium leading-snug line-clamp-2 mt-2">
                {{ card.name }}
              </p>

              <div
                v-for="(benefit, i) in expandedBenefits[card.id] ? card.benefits : card.benefits.slice(0, 3)"
                :key="i"
                class="flex gap-1 items-start mt-1"
              >
                <component
                  :is="resolveIcon(benefit)"
                  class="w-4 h-4 text-gray-500 mt-0.5 shrink-0"
                />
                <span class="text-xs text-gray-600 leading-snug">
                  {{ benefit.summary }}
                </span>
              </div>

              <div v-if="card.benefits.length > 3" class="mt-2">
                <button
                  @click.stop="toggleBenefit(card.id)"
                  class="text-xs text-gray-600 flex items-center gap-1"
                >
                  {{ expandedBenefits[card.id] ? '접기' : '더보기' }}
                  <component
                    :is="expandedBenefits[card.id] ? ChevronUp : ChevronDown"
                    class="w-4 h-4 text-gray-400"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AccordionItem>
    </Accordion>
  </div>
</template>
