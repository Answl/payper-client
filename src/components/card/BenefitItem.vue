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
  </div>
</template>
