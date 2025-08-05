<script setup lang="ts">
import { computed, defineProps, type Component } from "vue";
import {
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Coffee,
  Film,
  FlaskConical,
  BookOpen,
  Candy,
} from "lucide-vue-next";
import type { Card } from "@/types/Card";

const props = defineProps<{
  card: Card;
  expanded: boolean;
  onToggle: () => void;
  onClick: () => void;
}>();

const iconMap: Record<string, Component> = {
  편의점: ShoppingBag,
  카페: Coffee,
  "헬스/뷰티": FlaskConical,
  문화: Film,
  도서: BookOpen,
  생활: ShoppingBag,
  식비: Candy,
};

const resolveIcon = (benefit: Card["benefits"][number]): Component => {
  const normalize = (str?: string) => str?.trim().toLowerCase() || "";
  const category = normalize(benefit.categories?.[0]?.name);
  const partner = normalize(benefit.partners?.[0]?.name);
  return iconMap[category] || iconMap[partner] || ShoppingBag;
};

const displayBenefits = computed(() =>
  props.expanded ? props.card.benefits ?? [] : (props.card.benefits ?? []).slice(0, 3)
);
</script>

<template>
  <div class="px-4 py-4 flex cursor-pointer" @click="onClick">
    <img :src="card.imageUrl" alt="카드 이미지" class="w-20 h-32 object-cover rounded-md" />
    <div class="ml-4 flex-1">
      <p class="text-xs text-gray-500">{{ card.company?.name }}</p>
      <p class="text-sm text-gray-900 font-medium leading-snug line-clamp-2 mt-2">
        {{ card.name }}
      </p>

      <div v-for="(benefit, i) in displayBenefits" :key="i" class="flex gap-1 items-start mt-1">
        <component :is="resolveIcon(benefit)" class="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
        <span class="text-xs text-gray-600 leading-snug">{{ benefit.summary }}</span>
      </div>

      <div v-if="(card.benefits?.length ?? 0) > 3" class="mt-2">
        <button @click.stop="onToggle" class="text-xs text-gray-600 flex items-center gap-1">
          {{ expanded ? "접기" : "더보기" }}
          <component :is="expanded ? ChevronUp : ChevronDown" class="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  </div>
</template>
