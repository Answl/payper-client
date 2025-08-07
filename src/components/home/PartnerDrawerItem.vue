<script setup lang="ts">
import type { Partner } from "@/types/Partner";
import { useRouter } from "vue-router";

const { partner } = defineProps<{
  partner: Partner;
}>();

const router = useRouter();

const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${distance}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};

const goToPartnerDetails = () => {
  router.push(`/partners/${partner.id}`);
};
</script>

<template>
  <div
    class="bg-stone-100 text-stone-900 rounded-2xl p-4 py-6 min-h-[100px] flex items-center justify-between cursor-pointer hover:bg-stone-200 transition-colors"
    @click="goToPartnerDetails"
  >
    <!-- Left Section: Partner Info -->
    <div class="flex items-center gap-4">
      <!-- Partner Image -->
      <div class="w-12 h-12 rounded-full bg-stone-300 overflow-hidden">
        <img :src="partner.imageUrl" :alt="partner.name" class="w-full h-full object-cover" />
      </div>

      <!-- Partner Details -->
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

    <!-- Right Section: Card & Benefit Info -->
    <div class="flex flex-col items-end text-sm">
      <!-- 카드가 있는 경우 -->
      <div v-if="partner.myCards.length > 0" class="flex flex-col gap-1 items-end">
        <span>{{ partner.myCards[0].name }}</span>
      </div>

      <!-- 카드가 없는 경우 - 그림과 같은 스타일 -->
      <div v-else class="flex flex-col gap-1 items-center justify-center text-stone-300"></div>
    </div>
  </div>
</template>
