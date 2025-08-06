<script setup lang="ts">
import { ref, computed } from "vue";
import PartnerSearchBar from "@/components/home/HomeSearchBar.vue";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import { RotateCcw } from "lucide-vue-next";
import KakaoMap from "@/components/home/KakaoMap.vue";
import CommonButton from "@/components/ui/button/CommonButton.vue";
import { usePartnersQuery } from "@/composables/partner.query";
import PartnersDrawer from "@/components/home/PartnersDrawer.vue";

const drawerHeight = ref(12);
const keyword = ref("");
const currentLat = ref<number>(0);
const currentLng = ref<number>(0);

const searchOptions = computed(() => ({
  x: currentLng.value,
  y: currentLat.value,
  query: keyword.value,
}));

const { data, refetch } = usePartnersQuery(searchOptions);

const handleSearch = async (newKeyword: string) => {
  keyword.value = newKeyword;
  if (!currentLat.value || !currentLng.value) return;
  await refetch();
  openDrawerToCenter();
};

const refreshLocation = async () => {
  await refetch();
  openDrawerToCenter();
};

const openDrawerToCenter = () => {
  drawerHeight.value = 50;
};

const handleDrawerHeightChange = (newHeight: number) => {
  drawerHeight.value = newHeight;
};
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <!-- <div id="map" class="w-full h-full z-0" /> -->
    <KakaoMap
      :partners="data?.partners"
      v-model:currentLat="currentLat"
      v-model:currentLng="currentLng"
    />

    <PartnerSearchBar
      class="absolute top-0 left-0 w-full z-10 p-4"
      :onSubmit="handleSearch"
      v-model:keyword="keyword"
    />

    <CommonButton
      class="absolute right-3 top-32 z-10 p-4 size-10 flex items-center justify-center rounded-full bg-white text-stone-700 shadow-lg hover:bg-stone-100"
      @click="refreshLocation"
    >
      <RotateCcw />
    </CommonButton>

    <PartnersDrawer
      :partners="data?.partners"
      :height="drawerHeight"
      @height-change="handleDrawerHeightChange"
    />
    <BottomNavigation selected="home" />
  </div>
</template>
