<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getPartner } from "@/api/partner.api";
import type { Partner } from "@/types/Partner";
import type { Card } from "@/types/Card";

const currentRoute = useRoute();
const partnerObj = ref<Partner>();
const error = ref(false);
const partnerCard = ref<Card[]>();

onMounted(async () => {
  const partnerId = Number(currentRoute.params.id);

  try {
    const data = await getPartner(partnerId);
    partnerObj.value = data;
    partnerCard.value = data.myCards;
  } catch {
    error.value = true;
  }
});
</script>

<template>
  <div v-if="error">
    <h1>not enrolled partner</h1>
  </div>
  <div v-else>
    <h1 data-testid="partnerNameTest">{{ partnerObj?.name }}</h1>
    <p>this is my part ner details</p>
    <ul>
     <li v-for="Card in partnerCard" :key="Card.id">
       {{ Card.name }}
     </li>
    </ul>
  </div>
</template>
