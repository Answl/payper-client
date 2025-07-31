<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useGeolocation } from "@vueuse/core";
import { getMAPartner } from "@/api/mapartner.api";
import PartnerSearchBar from "@/components/home/HomeSearchBar.vue";

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
const { coords } = useGeolocation();

const map = ref<kakao.maps.Map | null>(null);
const markers = ref<kakao.maps.Marker[]>([]);

// 지도 초기화
const initMap = () => {
  if (!coords.value.latitude || !coords.value.longitude) return;

  const container = document.getElementById("map");
  if (!container) return;

  const center = new kakao.maps.LatLng(coords.value.latitude, coords.value.longitude);
  map.value = new kakao.maps.Map(container, { center, level: 3 });

  const myMarker = new kakao.maps.Marker({ position: center });
  myMarker.setMap(map.value);
};

// 마커 표시 함수
const handleSearch = async (keyword: string) => {
  if (!coords.value.latitude || !coords.value.longitude) return;

  const res = await getMAPartner(keyword, coords.value.latitude, coords.value.longitude);
  const data = res.partners;

  markers.value.forEach((m) => m.setMap(null));
  markers.value = [];

  for (const partner of data) {
    if (partner?.position) {
      const latLng = new kakao.maps.LatLng(partner.position.x, partner.position.y);
      const marker = new kakao.maps.Marker({ position: latLng });
      marker.setMap(map.value);
      markers.value.push(marker);
    }
  }
};

// SDK 로드
onMounted(() => {
  if (document.getElementById("kakao-map-sdk")) return;

  const script = document.createElement("script");
  script.id = "kakao-map-sdk";
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
  script.async = true;
  script.onload = () => {
    window.kakao.maps.load(() => {
      // 좌표가 이미 있다면 바로 initMap, 아니면 watch로 대기
      if (coords.value.latitude && coords.value.longitude) {
        initMap();
      } else {
        watch(
          () => coords.value,
          (val) => {
            if (val.latitude && val.longitude) {
              initMap();
            }
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
  <div class="relative w-full h-screen">
    <!-- 검색창 + 카테고리 버튼: 상단 고정 -->
    <div class="absolute top-0 left-0 z-10 w-full p-4">
      <PartnerSearchBar :onSubmit="handleSearch" />
    </div>

    <!-- 지도: 전체 화면 -->
    <div id="map" class="w-full h-full" />
  </div>
</template>
