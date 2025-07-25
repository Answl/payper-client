<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Cards } from "@/types/Cards";
import type { Card } from "@/types/Card";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const cards = ref<Cards>();
const filteredCards = ref<Cards>({ cards: [] });
const searchKeyword = ref("");

const fetchCards = async () => {
  const res = await axios.get("/api/cards");
  cards.value = res.data;
  filteredCards.value = res.data;
};

const filterCards = () => {
  if (!cards.value) return;
  const keyword = searchKeyword.value.trim().toLowerCase();
  const filtered = cards.value.cards.filter((card: Card) =>
    card.name.toLowerCase().includes(keyword)
  );
  filteredCards.value = { cards: filtered };
};

const goToDetail = (id: number) => {
  router.push({ name: "cardsDetails", params: { id } });
};

onMounted(fetchCards);
</script>

<template>
  <div>
    <input v-model="searchKeyword" type="text" placeholder="카드 이름을 입력하세요" />
    <button @click="filterCards">검색</button>

    <ul v-if="filteredCards?.cards.length > 0">
      <li
        v-for="card in filteredCards.cards"
        :key="card.id"
        @click="goToDetail(card.id)"
        data-testid="cardItem"
        style="cursor: pointer"
      >
        <div>{{ card.name }}</div>
        <div>{{ card.company.name }}</div>
      </li>
    </ul>
    <p v-else>검색 결과가 없습니다.</p>
  </div>
</template>
