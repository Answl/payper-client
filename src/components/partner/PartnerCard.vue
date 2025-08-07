<script setup lang="ts">
import type { Card } from "@/types/Card";
import { useRouter } from "vue-router";

const router = useRouter();

const { card } = defineProps<{
  card: Card;
}>();

const onClick = () => {
  router.push({ name: "cardDetails", params: { id: card.id } });
};
</script>

<template>
  <div @click="onClick" class="flex gap-5 w-full hover:cursor-pointer">
    <img :src="card.imageUrl" class="w-24 h-full object-cover" />
    <div class="flex flex-col gap-2 w-full h-full justify-between">
      <div class="flex flex-col">
        <p class="text-stone-500 text-sm">{{ card.company.name }}</p>
        <p class="text-stone-900">{{ card.name }}</p>
      </div>
      <div class="flex flex-col gap-2 items-end">
        <div v-if="card.benefits && card.benefits.length > 0" class="flex flex-col gap-1 items-end">
          <p class="text-stone-500 text-sm">{{ card.preMonthSpending ? card.preMonthSpending : "전월 실적 정보 없음" }}</p>
          <p  class="text-primary font-bold">
            {{ card.benefits[0].summary }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
