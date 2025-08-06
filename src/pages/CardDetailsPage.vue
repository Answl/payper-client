<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useCardQuery } from "@/composables/card.query";
import BenefitItem from "@/components/card/BenefitItem.vue";
import PageHolder from "@/components/common/PageHolder.vue";
import CommonButton from "@/components/ui/button/CommonButton.vue";
import { Plus } from "lucide-vue-next";
import { ref } from "vue";
import { useAddToMyCardsMutation } from "@/composables/mycard.query";

const route = useRoute();
const router = useRouter();
const cardId = Number(route.params.id);

const { data: card } = useCardQuery(cardId);
const selectedGradeIndex = ref<number>(0);

const { mutate } = useAddToMyCardsMutation({
  onSuccess: () => {
    router.push({ name: "myCards" });
  },
});

const onAddCardClick = () => {
  mutate(cardId);
};
</script>

<template>
  <PageHolder v-if="card" title="카드 상세">
    <div class="flex flex-col items-center gap-5">
      <img :src="card.imageUrl" class="object-contain max-w-48 h-48" />
      <div class="flex flex-col items-center gap-2">
        <p class="text-sm text-stone-500">{{ card.company.name }}</p>
        <h1 class="text-2xl font-bold">{{ card.name }}</h1>
      </div>
      <CommonButton variant="outline" class="w-full" @click="onAddCardClick"
        ><Plus /><span>내 카드에 추가하기</span>
      </CommonButton>
    </div>
    <div class="flex w-full text-sm">
      <div class="flex flex-col w-full gap-2">
        <p class="font-bold">전월실적</p>
        <p class="text-stone-500">최소 {{ card.grades[0].start / 10000 }}만원</p>
      </div>
      <div class="flex flex-col w-full gap-2">
        <p class="font-bold">연회비</p>
        <p class="text-stone-500">
          {{ card.annualCost }}
        </p>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-sm text-stone-500">전월실적</p>
      <div class="flex w-full">
        <CommonButton
          v-for="(grade, index) in card.grades"
          :key="index"
          :variant="index === selectedGradeIndex ? 'default' : 'outline'"
          class="flex-1"
          @click="selectedGradeIndex = index"
        >
          {{ grade.start / 10000 }}만원
        </CommonButton>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2">
      <h1 class="text-3xl text-primary font-bold">
        {{ card.grades[selectedGradeIndex ?? 0]?.totalDiscount?.toLocaleString?.() || "0" }}원
      </h1>
      <p class="text-stone-500 text-sm">최대 할인 한도</p>
    </div>
    <div class="flex flex-col gap-5">
      <BenefitItem
        v-for="benefit in card.benefits"
        :key="benefit.id"
        :benefit="benefit"
        :gradeIndex="selectedGradeIndex"
      />
    </div>
  </PageHolder>
</template>
