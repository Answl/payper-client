<script setup lang="ts">
import SelectDrawerButton from "@/components/search/SelectDrawerButton.vue";

const selected = defineModel<string[]>("selected");

const { benefitOptions } = defineProps<{
  benefitOptions: string[];
}>();

const emit = defineEmits<{
  (e: "clear"): void;
}>();

const cardCompanies = ["KB국민카드", "신한카드", "우리카드"];
const performanceOptions = ["없음", "30만원 이상", "50만원 이상"];
</script>

<template>
  <div class="flex flex-wrap gap-2 items-center mb-2 px-10">
    <SelectDrawerButton label="혜택" :options="benefitOptions" v-model:selected="selected" />
    <SelectDrawerButton label="카드사" :options="cardCompanies" v-model:selected="selected" />
    <SelectDrawerButton
      label="전월실적"
      :options="performanceOptions"
      v-model:selected="selected"
    />

    <button
      v-if="!selected!.length"
      class="text-sm text-gray-500 underline ml-auto"
      @click="emit('clear')"
    >
      초기화
    </button>
  </div>
</template>
