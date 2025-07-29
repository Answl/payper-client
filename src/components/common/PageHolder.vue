<script setup lang="ts">
import type { NavigationRoutes } from "@/types/navigation/NavigationRoutes";
import BottomNavigation from "./BottomNavigation.vue";
import CommonHeader from "../CommonHeader.vue";

const { title } = defineProps<{
  title: string;
  bottomNavigation?: boolean;
  selected?: NavigationRoutes;
}>();
</script>

<template>
  <div class="flex flex-col size-full">
    <CommonHeader :title="title" />
    <div class="flex flex-col p-[30px] size-full gap-10">
      <slot />
    </div>
    <BottomNavigation v-if="bottomNavigation" :selected="selected" />
  </div>
</template>
