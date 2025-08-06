<script setup lang="ts">
import SelectDrawerButton from "@/components/search/SelectDrawerButton.vue";

const selectedBenefits = defineModel<string[]>("benefits");
const selectedCompanies = defineModel<string[]>("companies");

const { benefitOptions } = defineProps<{
  benefitOptions: string[];
}>();

const cardCompanies = ["KB국민카드", "신한카드", "우리카드"];
</script>

<template>
  <div class="flex flex-wrap gap-2 items-center mb-2 px-10">
    <SelectDrawerButton
      label="혜택"
      :options="benefitOptions"
      v-model:selected="selectedBenefits"
    />
    <SelectDrawerButton
      label="카드사"
      :options="cardCompanies"
      v-model:selected="selectedCompanies"
    />
  </div>
</template>
