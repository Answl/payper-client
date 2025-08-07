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
    <div class="flex flex-col gap-2 w-full">
      <div class="flex flex-col">
        <p class="text-stone-500 text-sm">{{ card.company.name }}</p>
        <p class="text-stone-900">{{ card.name }}</p>
      </div>
      <p class="text-stone-500 text-sm">
        ※ 이용금액 건당 1만원 이상 시<br />
        ※ 상품권, 선불카드 구입(충전) 제외
      </p>
      <div class="flex flex-col gap-2 items-end">
        <!-- <p class="text-stone-900 text-sm">전월실적 {{ card.grades[0].start / 10000 }}만원 이상</p> -->
        <div class="flex gap-2 items-center">
          <p class="text-stone-500 text-sm">예상혜택</p>
          <p class="text-primary font-bold">
            <!-- {{ card.grades?.[0].totalDiscount?.toLocaleString?.() || "0" }}원 할인 -->
            <!-- {{ card.grades[0].totalDiscount.toLocaleString() }}원 할인 -->
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
