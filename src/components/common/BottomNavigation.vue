<script setup lang="ts">
import { CreditCard, MapPinned, Menu, Search, UserRound } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation/NavigationItem";

const { selected } = defineProps<{
  selected?: string;
}>();

const router = useRouter();

const items: NavigationItem[] = [
  {
    id: 0,
    title: "내 카드",
    name: "myCards",
    icon: CreditCard,
  },
  {
    id: 1,
    title: "검색",
    name: "search",
    icon: Search,
  },
  {
    id: 2,
    title: "지도",
    name: "home",
    icon: MapPinned,
  },
  {
    id: 3,
    title: "프로필",
    name: "profile",
    icon: UserRound,
  },
  {
    id: 4,
    title: "더보기",
    name: "more",
    icon: Menu,
  },
];

const onClick = (name: string) => {
  router.push({ name });
};
</script>

<template>
  <ul class="flex justify-between items-center bg-white px-4 py-2 rounded-t-xl">
    <li
      v-for="item in items"
      :key="item.id"
      @click="onClick(item.name)"
      class="flex flex-1 justify-center items-center"
      :data-testid="`nav-item-${item.name}`"
    >
      <button
        class="flex flex-col items-center justify-center space-y-1 focus-visible:outline-none"
      >
        <component
          :is="item.icon"
          :class="cn('w-5 h-5', selected === item.name ? 'text-primary' : 'text-stone-500')"
        />
        <span
          :class="
            cn('text-xs font-medium', selected === item.name ? 'text-primary' : 'text-stone-500')
          "
        >
          {{ item.title }}
        </span>
      </button>
    </li>
  </ul>
</template>
