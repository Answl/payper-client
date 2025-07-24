<script setup lang="ts">
import { getMyCards } from "@/api/mycard.api";
import type { Cards } from "@/types/Cards";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const cards = ref<Cards>();
const router = useRouter();

onMounted(async () => {
  const data = await getMyCards();
  cards.value = data;
});

const onClick = (id: number) => {
  router.push({ name: "cardsDetails", params: { id: id } });
};
</script>

<template>
  <div>
    <div v-for="card in cards?.cards" :key="card.id" @click="onClick(card.id)">
      <div data-testid="cardItem">
        <p>{{ card.name }}</p>
        <p>{{ card.company.name }}</p>
        <ul>
          <li v-for="benefit in card.benefits" :key="benefit.id">
            <p> {{ benefit.title }} </p>
            <p> {{ benefit.categories[0]?.name }} </p>
            <p> {{ benefit.partners[0]?.name }} </p>
            <p> {{ benefit.benefitGrades[0]?.discount.amount }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

