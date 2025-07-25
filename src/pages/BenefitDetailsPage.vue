<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Benefit } from "@/types/Benefit";
import { getBenefit } from "@/api/benefit.api";
const route = useRoute();
const benefit = ref<Benefit | null>(null);
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const { cardId, benefitId } = route.params;
    benefit.value = await getBenefit(String(cardId), String(benefitId));
  } catch {
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error">혜택 정보를 불러올 수 없습니다.</div>
    <div v-else-if="benefit">
      <h1>{{ benefit.title }}</h1>
      <p>{{ benefit.summary }}</p>
      <p>{{ benefit.description }}</p>
      <div v-if="benefit.limit">
        <p>일일 제한: {{ benefit.limit.limitCountPerDay ?? "없음" }}</p>
        <p>월간 제한: {{ benefit.limit.limitCountPerMonth ?? "없음" }}</p>
      </div>
      <p>최소 결제 금액: {{ benefit.minPayment }}원</p>
    </div>
  </div>
</template>
