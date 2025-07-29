<script setup lang="ts">
import PageHolder from "@/components/common/PageHolder.vue";
import PartnerCard from "@/components/partner/PartnerCard.vue";
import PartnerInfo from "@/components/partner/PartnerInfo.vue";
import { usePartnerQuery } from "@/composables/partner.query";
import { useRoute } from "vue-router";

const route = useRoute();
const partnerId = route.params.id as string;
const { data } = usePartnerQuery(partnerId);
</script>

<template>
  <PageHolder v-if="data" title="가맹점 정보">
    <PartnerInfo :partner="data" />
    <div class="flex flex-col bg-stone-100 p-5 rounded-xl">
      <p class="text-stone-900">혜택 적용 카드</p>
      <p class="text-stone-500">아래 카드를 사용하면 혜택을 받을 수 있어요.</p>
    </div>
    <PartnerCard v-for="card in data.myCards" :key="card.id" :card="card" />
  </PageHolder>
</template>
