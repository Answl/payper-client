<script setup lang="ts">
import { defineProps } from 'vue';
import type { Partner } from "@/types/Partner";

const props = defineProps<{
  Partners: Partner[];
}>();
</script>

<template>
  <div>
    <ul>
     <li v-for="Partner in props.Partners" :key="Partner.id">
       {{ Partner.myCards[0].name }}{{ Partner.name }}
       {{ Partner.myCards[0].benefits[0] }}{{ Partner.position.distance }}
     </li>
    </ul>
  </div>
</template>
