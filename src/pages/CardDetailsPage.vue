<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCardById } from "@/api/card.api";
import type { Card } from "@/types/Card";

const route = useRoute();
const card = ref<Card | null>(null);
const error = ref(false);

onMounted(async () => {
  const id = Number(route.params.id);
  try {
    card.value = await getCardById(id);
  } catch {
    error.value = true;
  }
});
</script>

<template>
  <div v-if="error">카드를 찾을 수 없습니다.</div>

  <div v-else-if="card">
    <h1>{{ card.name }}</h1>
    <p>{{ card.company.name }}</p>
    <ul>
      <li v-for="benefit in card.benefits" :key="benefit.id">
        <span>{{ benefit.title }}</span>
        <span v-for="category in benefit.categories" :key="category.id">
          {{ category.name }}
        </span>
        /
        <span v-for="partner in benefit.partners" :key="partner.id">
          {{ partner.name }}
        </span>
        /
        {{ benefit.benefitGrades[0]?.discount.amount
        }}{{ benefit.benefitGrades[0]?.discount.type === "RATE" ? "%" : "원" }}
      </li>
    </ul>
  </div>
</template>
