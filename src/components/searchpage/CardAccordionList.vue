<script setup lang="ts">
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import CardItem from "@/components/cardlist/CardItem.vue";
import type { Card } from "@/types/Card";

const { cards, expandedMap } = defineProps<{
  cards: Card[];
  expandedMap: Record<number, boolean>;
}>();

const emit = defineEmits<{
  (e: "toggle", cardId: number): void;
  (e: "detail", cardId: number): void;
}>();
</script>

<template>
  <Accordion type="single" collapsible class="space-y-4 px-10 pb-6">
    <AccordionItem
      v-for="card in cards"
      :key="card.id"
      :value="String(card.id)"
      class="overflow-hidden"
    >
      <div class="w-[95%] mx-auto">
        <CardItem
          :card="card"
          :expanded="!!expandedMap[card.id]"
          :onToggle="() => emit('toggle', card.id)"
          :onClick="() => emit('detail', card.id)"
        />
      </div>
    </AccordionItem>
  </Accordion>
</template>
