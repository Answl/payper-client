<script setup lang="ts">
import { defineProps } from "vue";
import type { Partner } from "@/types/Partner";

const { partners } = defineProps<{
  partners: Partner[];
}>();
</script>

<template>
  <div>
    <ul>
      <li v-for="partner in partners" :key="partner.id">
        {{ partner.myCards[0].name }}{{ partner.name }} {{ partner.myCards[0].benefits[0]
        }}{{ partner.position?.distance }}
      </li>
    </ul>
  </div>
</template>
