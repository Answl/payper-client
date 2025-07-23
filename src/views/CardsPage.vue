<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Card } from "@/types/Card";
import axios from "axios";

const cards = ref<Card[]>([]);

onMounted(async () => {
  const res = await axios.get<Card[]>("/api/cards");
  cards.value = res.data;
});
</script>

<template>
  <div>
    <ul v-if="cards.length > 0">
      <li v-for="card in cards" :key="card.id">
        <div>{{ card.name }}</div>
        <div>{{ card.company.name }}</div>
      </li>
    </ul>
  </div>
</template>
