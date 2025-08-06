<script setup lang="ts">
import type { Partner } from "@/types/Partner";
import { useRouter } from "vue-router";

defineProps<{
  partners: Partner[];
}>();

const router = useRouter();

const goToPartnerDetail = (id: number) => {
  router.push(`/partners/${id}`);
};
</script>

<template>
  <div class="space-y-4 px-10 pb-20">
    <div
      v-for="partner in partners"
      :key="partner.id"
      class="rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-stone-200 transition"
      @click="goToPartnerDetail(partner.id)"
    >
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full overflow-hidden bg-stone-300">
          <img
            :src="partner.imageUrl || '/placeholder.png'"
            alt="partner"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex flex-col">
          <span class="text-xs text-gray-500">
            {{ partner.category?.name || "카테고리 없음" }}
          </span>
          <span class="text-sm font-semibold text-[#F67154]">
            {{ partner.name }}
          </span>
          <span class="text-xs text-gray-400" v-if="partner.position?.placeName">
            {{ partner.position.placeName }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
