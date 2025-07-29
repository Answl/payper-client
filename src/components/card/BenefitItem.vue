<script setup lang="ts">
import type { Benefit } from "@/types/Benefit";
import BenefitDescriptionAccordion from "./BenefitDescriptionAccordion.vue";

const { benefit, gradeIndex } = defineProps<{
  benefit: Benefit;
  gradeIndex: number;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 w-full p-5 bg-stone-100 rounded-xl">
    <div class="flex w-full gap-2">
      <img :src="benefit.iconUrl" class="w-10 h-10" />
      <div class="flex flex-col gap-1 w-full">
        <p>{{ benefit.title }}</p>
        <p class="text-stone-500 text-sm break-keep">{{ benefit.summary }}</p>
        <BenefitDescriptionAccordion :description="benefit.description" />
      </div>
    </div>
    <div class="flex flex-col w-full items-end">
      <p class="text-stone-500">
        {{ benefit.benefitGrades[gradeIndex].grade.start / 10000 }}만원 이상
      </p>
      <p class="text-primary font-bold text-xl">
        {{ benefit.benefitGrades[gradeIndex].discount.amount.toLocaleString()
        }}{{ benefit.benefitGrades[gradeIndex].discount.type === "FIXED_AMOUNT" ? "원" : "%" }}
      </p>
    </div>
  </div>
</template>
