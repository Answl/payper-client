<script setup lang="ts">
import { ref, onMounted, type Component } from "vue";
import { useRouter } from "vue-router";
import {
  Plus,
  Coffee,
  Film,
  FlaskConical,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ShoppingBag,
  Candy,
} from "lucide-vue-next";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { getMyCards } from "@/api/mycard.api";
import type { Card } from "@/types/Card";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import CommonHeader from "@/components/CommonHeader.vue";

const router = useRouter();
const cards = ref<Card[]>([]);
const loading = ref(false);
const expandedBenefits = ref<Record<number, boolean>>({});

const iconMap: Record<string, Component> = {
  편의점: ShoppingBag,
  카페: Coffee,
  "헬스/뷰티": FlaskConical,
  문화: Film,
  도서: BookOpen,
  생활: ShoppingBag,
  식비: Candy,
};

const resolveIcon = (benefit: Card["benefits"][number]): Component => {
  const normalize = (str?: string) => str?.trim().toLowerCase() || "";
  const category = normalize(benefit.categories?.[0]?.name);
  const partner = normalize(benefit.partners?.[0]?.name);
  return iconMap[category] || iconMap[partner] || ShoppingBag;
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

const goToAdd = () => router.push("/search");

const goToDetail = (id: number) => {
  router.push({ name: "cardDetails", params: { id } });
};

const toggleBenefit = (cardId: number) => {
  expandedBenefits.value[cardId] = !expandedBenefits.value[cardId];
};
</script>

<template>
  <div class="flex flex-col size-full">
    <CommonHeader title="내 카드" />

    <div v-if="cards.length === 0" class="text-center text-sm text-gray-500 mt-10">
      등록된 카드가 없습니다.
    </div>

    <Accordion type="single" collapsible class="space-y-4 px-6">
      <AccordionItem
        v-for="card in cards"
        :key="card.id"
        :value="String(card.id)"
        class="overflow-hidden"
      >
        <div
          class="px-4 py-4 flex cursor-pointer"
          data-testid="cardItem"
          @click="goToDetail(card.id)"
        >
          <img :src="card.imageUrl" alt="카드 이미지" class="w-20 h-32 object-cover rounded-md" />
          <div class="ml-4 flex-1 mt-2">
            <p class="text-xs text-gray-500">{{ card.company?.name }}</p>
            <p class="text-sm text-gray-900 font-medium leading-snug line-clamp-2 mt-2">
              {{ card.name }}
            </p>

            <div
              v-for="(benefit, i) in expandedBenefits[card.id]
                ? card.benefits
                : card.benefits.slice(0, 3)"
              :key="i"
              class="flex gap-1 items-start mt-1"
            >
              <component :is="resolveIcon(benefit)" class="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
              <span class="text-xs text-gray-600 leading-snug">
                {{ benefit.summary }}
              </span>
            </div>

            <div v-if="card.benefits.length > 3" class="mt-2">
              <button
                @click.stop="toggleBenefit(card.id)"
                class="text-xs text-gray-600 flex items-center gap-1"
              >
                {{ expandedBenefits[card.id] ? "접기" : "더보기" }}
                <component
                  :is="expandedBenefits[card.id] ? ChevronUp : ChevronDown"
                  class="w-4 h-4 text-gray-400"
                />
              </button>
            </div>
          </div>
        </div>
      </AccordionItem>
    </Accordion>

    <div class="border-b border-gray-200 mx-10 mb-4 py-4"></div>
    <div class="flex flex-col px-4 py-4 size-full">
      <button
        @click="goToAdd"
        class="w-full mt-4 bg-[#F67154] text-white py-4 rounded-md text-base font-semibold flex items-center justify-center gap-2 shadow-md"
      >
        <Plus class="w-5 h-5" />
        내 카드 추가하기
      </button>
    </div>
    <BottomNavigation selected="myCards" />
  </div>
</template>
