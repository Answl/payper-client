<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Card } from "@/types/Card";
import axios from "axios";

const cards = ref<Card[]>([]);
const filteredCards = ref<Card[]>([]);
const searchKeyword = ref("");

const fetchCards = async () => {
  const res = await axios.get("/api/cards");
  cards.value = res.data.cards;
  filteredCards.value = res.data.cards;
};

const filterCards = () => {
  const keyword = searchKeyword.value.trim().toLowerCase();
  filteredCards.value = cards.value.filter((card) => card.name.toLowerCase().includes(keyword));
};

onMounted(fetchCards);
</script>

<template>
  <div>
    <input v-model="searchKeyword" type="text" placeholder="카드 이름을 입력하세요" />
    <button @click="filterCards">검색</button>

    <ul v-if="filteredCards.length > 0">
      <li v-for="card in filteredCards" :key="card.id">
        <div>{{ card.name }}</div>
        <div>{{ card.company.name }}</div>
      </li>
    </ul>
    <p v-else>검색 결과가 없습니다.</p>
  </div>
</template>
