<script setup lang="ts">
import { getMyCards } from "@/api/mycard.api";
import type { Card } from "@/types/Card";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const cards = ref<Card[]>([]);
const router = useRouter();

onMounted(async () => {
  const data = await getMyCards();
  cards.value = data.cards;
});

const onClick = (id: number) => {
  router.push({ name: "cardsDetails", params: { id: id } });
};
</script>

<template>
  <div>
    <div v-for="card in cards" :key="card.id" @click="onClick(card.id)">
      <div data-testid="cardItem">
        <p>{{ card.name }}</p>
        <p>{{ card.benefits[0].range.start }}</p>
        <p>{{ card.benefits[0].range.end }}</p>
        <p>{{ card.benefits[0].target }}</p>
        <p>{{ card.benefits[0].discount.amount }}</p>
        <p>{{ card.benefits[0].discount.type }}</p>
        <p>{{ card.benefits[0].partner?.name ?? "" }}</p>
      </div>
    </div>
  </div>
</template>
