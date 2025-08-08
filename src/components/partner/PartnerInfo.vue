<script setup lang="ts">
import type { Partner } from "@/types/Partner";
import defaultPartnerImage from "@/assets/DEFAULT_PARTNER_IMAGE.png";

const { partner } = defineProps<{
  partner: Partner;
}>();
</script>

<template>
  <div class="flex items-center gap-4">
    <img
      :src="partner.imageUrl ? partner.imageUrl : defaultPartnerImage"
      class="object-contain h-20 aspect-square rounded-full border border-gray-300"
    />
    <p class="text-xl font-bold">{{ partner.name }}</p>
    <p class="text-xl text-black font-bold">{{ partner.category?.name }}</p>
  </div>
</template>
