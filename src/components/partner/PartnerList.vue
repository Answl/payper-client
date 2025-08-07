<script setup lang="ts">
import type { Partner } from "@/types/Partner";
import PartnerCard from "@/components/partner/PartnerCard.vue";
import { useRouter } from "vue-router";

const { partner } = defineProps<{
  partner: Partner;
}>();

const emit = defineEmits<{
  back: [];
}>();

const router = useRouter();

const formatDistance = (distance: number): string => {
  if (distance < 1000) return `${distance}m`;
  return `${(distance / 1000).toFixed(1)}km`;
};

const goToPartnerDetails = () => {
  router.push(`/partners/${partner.id}`);
};

const goBack = () => {
  emit("back");
};
</script>

<template>
  <div class="space-y-6">
    <!-- 뒤로 가기 버튼 -->
    <button class="text-sm text-primary font-semibold flex items-center gap-1" @click="goBack">
      돌아가기
    </button>

    <!-- 가맹점 정보 -->
    <div
      class="text-stone-900 rounded-2xl p-4 py-6 flex items-center justify-between cursor-pointer hover:bg-stone-200 transition-colors"
      @click="goToPartnerDetails"
    >
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-stone-300 overflow-hidden">
          <img :src="partner.imageUrl" :alt="partner.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col">
          <span class="text-xs text-stone-500">
            {{ partner.category?.name }}
          </span>
          <span class="text-primary">
            {{ partner.position?.placeName || partner.name }}
          </span>
          <span class="text-xs text-stone-500" v-if="partner.position">
            {{ formatDistance(partner.position.distance) }} ·
            {{ partner.position.roadAddressName }}
          </span>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[calc(100%-40px)] h-[3px] bg-stone-200 mx-auto my-[20px]"></div>

    <!-- 내 카드 리스트 -->
    <div v-if="partner.myCards.length > 0" class="text-stone-900 p-3 py-2 space-y-2">
      <PartnerCard v-for="card in partner.myCards" :key="card.id" :card="card" />
    </div>

    <div v-else class="text-sm text-stone-400 text-center">
      해당 가맹점에서 혜택이 있는 내 카드가 없습니다.
    </div>
  </div>
</template>
