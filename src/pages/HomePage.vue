<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useGeolocation } from "@vueuse/core";
import { getMAPartner } from "@/api/mapartner.api";
import PartnerSearchBar from "@/components/home/HomeSearchBar.vue";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import type { Partners } from "@/types/Partners";
import { RotateCcw } from "lucide-vue-next";

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
const { coords } = useGeolocation();

const map = ref<kakao.maps.Map | null>(null);
const markers = ref<kakao.maps.Marker[]>([]);
const PropsPartners = ref<Partners>();
const drawerHeight = ref(0);
const isDragging = ref(false);

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
  const windowHeight = window.innerHeight;
  const vh = ((windowHeight - clientY) / windowHeight) * 100;
  drawerHeight.value = Math.min(Math.max(vh, 20), 80);
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchend", stopDrag);
};

const startDrag = () => {
  isDragging.value = true;
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("touchmove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchend", stopDrag);
};

const initMap = () => {
  if (!coords.value.latitude || !coords.value.longitude) return;
  const container = document.getElementById("map");
  if (!container) return;

  const center = new kakao.maps.LatLng(coords.value.latitude, coords.value.longitude);
  map.value = new kakao.maps.Map(container, { center, level: 3 });

  const myMarker = new kakao.maps.Marker({ position: center });
  myMarker.setMap(map.value);
};

const handleSearch = async (keyword: string) => {
  if (!coords.value.latitude || !coords.value.longitude) return;
  const res = await getMAPartner(keyword, coords.value.latitude, coords.value.longitude);
  PropsPartners.value = res;

  drawerHeight.value = 30;

  markers.value.forEach((m) => m.setMap(null));
  markers.value = [];

  for (const partner of res.partners) {
    if (partner?.position) {
      const latLng = new kakao.maps.LatLng(
        parseFloat(partner.position.y),
        parseFloat(partner.position.x)
      );
      const marker = new kakao.maps.Marker({ position: latLng });
      marker.setMap(map.value);
      markers.value.push(marker);
    }
  }
};

const refreshLocation = async () => {
  if (!coords.value.latitude || !coords.value.longitude) return;
  const res = await getMAPartner("", coords.value.latitude, coords.value.longitude);
  PropsPartners.value = res;

  const newCenter = new kakao.maps.LatLng(coords.value.latitude, coords.value.longitude);
  map.value?.setCenter(newCenter);

  markers.value.forEach((m) => m.setMap(null));
  markers.value = [];

  for (const partner of res.partners) {
    if (partner?.position) {
      const latLng = new kakao.maps.LatLng(
        parseFloat(partner.position.y),
        parseFloat(partner.position.x)
      );
      const marker = new kakao.maps.Marker({ position: latLng });
      marker.setMap(map.value);
      markers.value.push(marker);
    }
  }
};

onMounted(() => {
  if (document.getElementById("kakao-map-sdk")) return;
  const script = document.createElement("script");
  script.id = "kakao-map-sdk";
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
  script.async = true;
  script.onload = () => {
    window.kakao.maps.load(() => {
      if (coords.value.latitude && coords.value.longitude) {
        initMap();
      } else {
        watch(
          () => coords.value,
          (val) => {
            if (val.latitude && val.longitude) initMap();
          },
          { immediate: true }
        );
      }
    });
  };
  document.head.appendChild(script);
});
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <div id="map" class="w-full h-full z-0" />

    <div class="absolute top-0 left-0 w-full z-10 p-4">
      <PartnerSearchBar :onSubmit="handleSearch" />

      <div class="mt-2 flex justify-end">
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-700 shadow hover:bg-gray-100"
          @click="refreshLocation"
          aria-label="위치 새로고침"
        >
          <RotateCcw class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-20 transition-all duration-300"
      :style="{ height: `${drawerHeight}vh` }"
    >
      <div
        class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-3 cursor-pointer"
        @mousedown="startDrag"
        @touchstart="startDrag"
      />

      <div class="px-4 space-y-4 overflow-y-auto h-[calc(100%-2rem)] pb-24">
        <h2 class="text-base font-semibold">혜택 가맹점</h2>
        <div
          v-for="partner in PropsPartners?.partners"
          :key="partner.id"
          class="border rounded-xl p-4 flex flex-col space-y-1 shadow"
        >
          <div class="text-sm text-gray-400">{{ partner.name }}</div>
          <div class="text-base font-semibold text-black">
            {{ partner.myCards[0]?.name ?? "카드 없음" }}
          </div>
          <div class="text-xs text-gray-500">{{ partner.position?.distance ?? 0 }}m</div>
          <div class="text-sm text-gray-500 font-bold">
            {{ partner.myCards[0]?.benefits[0].summary ?? "혜택 없음" }}
          </div>
        </div>
      </div>
    </div>
    <BottomNavigation selected="home" />
  </div>
</template>
