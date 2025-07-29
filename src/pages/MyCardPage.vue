<script setup lang="ts">
import { ref, onMounted, type Component } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  Plus,
  Coffee,
  Film,
  ChevronDown,
  ChevronUp,
} from "lucide-vue-next";
import { getMyCards } from "@/api/mycard.api";
import type { Card } from "@/types/Card";

const router = useRouter();
const expandedCardId = ref<number | null>(null);
const cards = ref<Card[]>([]);
const loading = ref(false);

const iconMap: Record<string, Component> = {
  "편의점": Coffee,
  "영화": Film,
};

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


const goBack = () => router.back();
const goToAdd = () => router.push("/cards/add");

const goToCardDetail = (id: number) => {
  router.push({
    name: "cardsDetails",
    params: { id },
  });
};

</script>

<template>
  <div class="min-h-screen bg-[#F7F7F7] pb-36 max-w-md mx-auto">

    <div class="flex items-center justify-between h-12 mt-6 mb-6 px-4">
      <button @click="goBack" class="w-6 h-6 flex items-center justify-center">
        <ArrowLeft class="w-6 h-6 text-black" />
      </button>
      <h1 class="text-xl font-bold text-center flex-1 -ml-6">내 카드</h1>
      <div class="w-6 h-6"></div>
    </div>

    <div v-if="cards.length === 0" class="text-center text-sm text-gray-500 mt-10">
      등록된 카드가 없습니다.
    </div>


    <div v-else class="space-y-4 pb-36 max-w-md mx-auto">
      <div
        v-for="card in cards"
        :key="card.id"
        class="bg-white rounded-2xl shadow-sm px-4 py-4 cursor-pointer mx-4"
        @click="goToCardDetail(card.id)"
        data-testid="cardItem"
      >

        <div class="flex">
          <img
            :src="card.imageUrl"
            alt="카드 이미지"
            class="w-20 h-32 object-cover rounded-md"
          />
          <div class="ml-4 flex-1">
            <p class="text-xs text-gray-500">{{ card.company?.name }}</p>
            <p class="text-sm text-gray-900 font-medium leading-snug line-clamp-2">
              {{ card.name }}
            </p>

            <div
              v-for="(benefit, i) in card.benefits.slice(0, 3)"
              :key="i"
              class="flex gap-1 items-start mt-1"
            >
              <component
                :is="iconMap[benefit.categories?.[0]?.name] || Coffee"
                class="w-4 h-4 text-gray-500 mt-0.5 shrink-0"
              />
              <span class="text-xs text-gray-600 leading-snug">
                {{ benefit.partners?.[0]?.name || '제휴처' }}에서
                {{ benefit.benefitGrades?.[0]?.discount?.amount ?? '?' }}
                {{ benefit.benefitGrades?.[0]?.discount?.type === 'RATE' ? '%' : '원' }}
                {{ benefit.title }}
              </span>
            </div>
          </div>
          <component
            :is="expandedCardId === card.id ? ChevronUp : ChevronDown"
            class="w-5 h-5 text-gray-400 self-start mt-1"
          />
        </div>

        <div
          v-if="expandedCardId === card.id"
          class="mt-4 ml-24 bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 text-sm text-gray-700"
        >
          <div
            v-for="(benefit, i) in card.benefits"
            :key="i"
            class="flex items-start gap-2"
          >
            <component
              :is="iconMap[benefit.categories?.[0]?.name] || Coffee"
              class="w-4 h-4 text-gray-500 mt-1 shrink-0"
            />
            <div class="flex-1">
              <p class="font-medium text-gray-800">
                {{ benefit.partners?.[0]?.name || '제휴처' }}:
                {{ benefit.benefitGrades?.[0]?.discount?.amount ?? '?' }}
                {{ benefit.benefitGrades?.[0]?.discount?.type === 'RATE' ? '%' : '원' }}
              </p>
              <p class="text-xs text-gray-500 mt-1" v-if="benefit.description" v-html="benefit.description" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md">
      <button
        @click="goToAdd"
        class="w-full mt-4 bg-[#F67154] text-white py-4 rounded-md text-base font-semibold flex items-center justify-center gap-2 shadow-md"
      >
        <Plus class="w-5 h-5" />
        내 카드 추가하기
      </button>
    </div>
  </div>
</template>
