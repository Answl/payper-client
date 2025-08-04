<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Plus } from "lucide-vue-next";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { getMyCards } from "@/api/mycard.api";
import type { Card } from "@/types/Card";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import CardItem from "@/components/cardlist/CardItem.vue";

const router = useRouter();
const cards = ref<Card[]>([]);
const loading = ref(false);
const expandedBenefits = ref<Record<number, boolean>>({});

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
        <cardItem
          :card="card"
          :expanded="!!expandedBenefits[card.id]"
          :onToggle="() => toggleBenefit(card.id)"
          :onClick="() => goToDetail(card.id)"
        />
      </AccordionItem>
    </Accordion>

    <div class="border-b border-gray-200 mx-10 mb-4 py-4"></div>
    <div class="flex flex-col px-4 py-4 size-full">
      <button
        @click="goToAdd"
        class="w-full mt-4 bg-[#F67154] text-white py-4 rounded-md text-base font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer"
      >
        <Plus class="w-5 h-5" />
        내 카드 추가하기
      </button>
    </div>
    <BottomNavigation selected="myCards" />
  </div>
</template>
