<script setup lang="ts">
import type { Partner } from "@/types/Partner";
import defaultPartnerImage from "@/assets/DEFAULT_PARTNER_IMAGE.png";

const { partner } = defineProps<{
  partner: Partner;
}>();

const emit = defineEmits<{
  "select-partner": [partner: Partner];
}>();

const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${distance}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};

// 드로어 내 카드 리스트 보여주기
const handleClick = () => {
  emit("select-partner", partner);
};
</script>

<template>
  <div
    class="bg-stone-100 text-stone-900 rounded-2xl p-4 py-6 min-h-[100px] flex items-center justify-between cursor-pointer hover:bg-stone-200 transition-colors"
    @click="handleClick"
  >
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-stone-300 overflow-hidden">
        <img
          :src="partner.imageUrl ? partner.imageUrl : defaultPartnerImage"
          :alt="partner.name"
          class="w-full h-full object-cover"
        />
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
</template>
