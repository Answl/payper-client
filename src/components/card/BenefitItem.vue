<script setup lang="ts">
import type { Benefit } from "@/types/Benefit";
import BenefitDescriptionAccordion from "./BenefitDescriptionAccordion.vue";
import defaultBenefitImage from "@/assets/DEFAULT_BENEFIT_IMAGE.png";

// const { benefit, gradeIndex } = defineProps<{
const { benefit } = defineProps<{
  benefit: Benefit;
  gradeIndex: number;
}>();
</script>

<template>
  <div class="flex flex-col gap-2 w-full p-5 bg-stone-100 rounded-xl">
    <div class="flex w-full gap-2">
      <img :src="benefit.iconUrl ? benefit.iconUrl : defaultBenefitImage" class="size-8" />
      <div class="flex flex-col gap-1 w-full">
        <p>{{ benefit.title }}</p>
        <p class="text-stone-500 text-sm break-keep">{{ benefit.summary }}</p>
        <BenefitDescriptionAccordion :description="benefit.description" />
      </div>
    </div>
    <div class="flex flex-col w-full items-end">
      <!-- <p class="text-stone-500">
        {{ benefit.benefitGrades[gradeIndex].grade.start / 10000 }}만원 이상
      </p> -->
      <!-- <p class="text-primary font-bold text-xl">
        {{ benefit.benefitGrades[gradeIndex].amount.toLocaleString() }} -->

      <!-- 혹시 "UNKNOWN"가 안될 경우를 대비하여 남겨둡니다. 서버에서 반영되면 삭제 가능 -->
      <!-- {{ benefit.benefitGrades[gradeIndex].type === "FIXED_AMOUNT" ? "원" : "%" }} -->

      <!-- {{
          benefit.benefitGrades[gradeIndex].type === "FIXED_AMOUNT"
            ? "원"
            : benefit.benefitGrades[gradeIndex].type === "RATE"
            ? "%"
            : ""
        }}
      </p> -->
    </div>
  </div>
</template>
