<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useGeolocation } from "@vueuse/core";
import { getMAPartner } from "@/api/mapartner.api";
import PartnerSearchBar from "@/components/home/HomeSearchBar.vue";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import { RotateCcw } from "lucide-vue-next";
import type { Partners } from "@/types/Partners";
import type { Partner } from "@/types/Partner";
import type { Card } from "@/types/Card";
import markerImg from "@/assets/MAP_MARKER.png";
import { useRouter } from "vue-router";

const router = useRouter();
const goToPartnerDetails = (id: number) => {
  router.push(`/partners/${id}`);
};

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
const { coords } = useGeolocation();

const map = ref<kakao.maps.Map | null>(null);
const markers = ref<kakao.maps.Marker[]>([]);
const PropsPartners = ref<Partners>();
const drawerHeight = ref(0);
const isDragging = ref(false);

const tabs = ["credit", "check"] as const;
type CardType = (typeof tabs)[number];
const selectedCardType = ref<CardType>("credit");

const getFilteredCard = (partner: Partner): Card | undefined => {
  return partner.myCards?.find((card) => card.type?.toLowerCase() === selectedCardType.value);
};

const filteredPartners = computed(() => {
  if (!PropsPartners.value?.partners) return [];
  return PropsPartners.value.partners.filter((partner) => getFilteredCard(partner));
});

const startDrag = () => {
  isDragging.value = true;
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("touchmove", onDrag);
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchend", stopDrag);
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("touchmove", onDrag);
  window.removeEventListener("mouseup", stopDrag);
  window.removeEventListener("touchend", stopDrag);
};

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value) return;
  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
  const windowHeight = window.innerHeight;
  const vh = ((windowHeight - clientY) / windowHeight) * 100;
  drawerHeight.value = Math.min(Math.max(vh, 20), 80);
};

const initMap = () => {
  if (!coords.value.latitude || !coords.value.longitude) return;
  const container = document.getElementById("map");
  if (!container) return;
  const center = new kakao.maps.LatLng(coords.value.latitude, coords.value.longitude);
  map.value = new kakao.maps.Map(container, { center, level: 3 });
  const markerImage = new kakao.maps.MarkerImage(markerImg, new kakao.maps.Size(40, 50));
  const myMarker = new kakao.maps.Marker({ position: center, image: markerImage });
  myMarker.setMap(map.value);
};

const updateMarkers = (partners: Partner[]) => {
  markers.value.forEach((m) => m.setMap(null));
  markers.value = [];
  for (const partner of partners) {
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

const handleSearch = async (keyword: string) => {
  if (!coords.value.latitude || !coords.value.longitude) return;
  const res = await getMAPartner(keyword, coords.value.latitude, coords.value.longitude);
  PropsPartners.value = res;
  drawerHeight.value = 30;
  updateMarkers(res.partners);
};

const refreshLocation = async () => {
  if (!coords.value.latitude || !coords.value.longitude) return;
  const res = await getMAPartner("", coords.value.latitude, coords.value.longitude);
  PropsPartners.value = res;
  const newCenter = new kakao.maps.LatLng(coords.value.latitude, coords.value.longitude);
  map.value?.setCenter(newCenter);
  updateMarkers(res.partners);
};

const loadMapScript = () => {
  //if (document.getElementById("kakao-map-sdk")) return;
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
};

onMounted(() => {
  loadMapScript();
});
</script>

<template>
  <div class="relative w-full h-screen overflow-hidden">
    <div id="map" class="w-full h-full z-0" />

    <div class="absolute top-0 left-0 w-full z-10 p-4">
      <PartnerSearchBar :onSubmit="handleSearch" />
      <div class="mt-2 flex justify-end">
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full bg-white text-stone-700 shadow hover:bg-stone-100"
          @click="refreshLocation"
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
        class="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mt-2 mb-3 cursor-pointer"
        @mousedown="startDrag"
        @touchstart="startDrag"
      />

      <div class="flex gap-6 pl-10 mb-4">
        <button
          v-for="type in tabs"
          :key="type"
          @click="selectedCardType = type"
          :class="[
            'text-xl px-0 pb-1 font-normal transition-all duration-150',
            selectedCardType === type
              ? 'text-black font-bold border-b-2 border-black'
              : 'text-gray-300 hover:text-black hover:border-b-2 hover:border-black',
          ]"
        >
          {{ type === "credit" ? "신용카드" : "체크카드" }}
        </button>
      </div>

      <div class="px-4 space-y-5 overflow-y-auto h-[calc(100%-4rem)] pb-24">
        <div
          v-for="partner in filteredPartners"
          :key="partner.id"
          class="bg-stone-100 rounded-2xl p-4 py-6 min-h-[100px] flex items-center justify-between"
          @click="goToPartnerDetails(partner.id)"
        >
          <div class="flex items-center gap-4">
            <!-- 가맹점 이미지 (원형) -->
            <div class="w-12 h-12 rounded-full bg-stone-300 overflow-hidden">
              <!-- 실제 서버 이미지 경로로 대체 -->
              <img
                :src="partner.imageUrl || '/placeholder.png'"
                alt="partner"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="flex flex-col">
              <!-- 가맹점명 -->
              <span class="text-xs text-stone-500">
                {{ partner.categoryName || "카테고리 없음" }}
              </span>
              <span class="text-ml font-semibold text-[#F67154]">{{
                partner.position?.place_name || partner.name
              }}</span>
              <span class="text-xs text-stone-500">
                {{ partner.position?.distance ?? 0 }}m ·
                {{ partner.position?.road_address_name ?? "" }}
              </span>
            </div>
          </div>

          <div class="flex flex-col items-end text-sm">
            <span class="text-xs text-stone-500">
              {{ getFilteredCard(partner)?.company?.name ?? "카드사 없음" }}
            </span>
            <span class="font-medium text-stone-800">
              {{ getFilteredCard(partner)?.name ?? "카드 없음" }}
            </span>
            <span class="text-xs text-stone-400">예상 혜택</span>
            <span class="text-sm font-bold" style="color: #f67154">
              {{ getFilteredCard(partner)?.benefits[0]?.summary ?? "혜택 없음" }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <BottomNavigation selected="home" />
  </div>
</template>
