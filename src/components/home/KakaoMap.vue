<script setup lang="ts">
import { ref, watch } from "vue";
import { onMounted } from "vue";
import userMarkerImage from "@/assets/USER_MARKER.png";
import defaultPartnerMarkerImage from "@/assets/DEFAULT_PARTNER_IMAGE.png";
import { useGeolocation } from "@vueuse/core";
import type { Partner } from "@/types/Partner";
import MoveToUserLocationButton from "./MoveToUserLocationButton.vue";

// 파트너 리스트
const { partners } = defineProps<{
  partners?: Partner[];
}>();

// 현재 지도가 보고 있는 중앙 위치
const currentLat = defineModel<number>("currentLat");
const currentLng = defineModel<number>("currentLng");

const DEFAULT_LAT = 37.54814587; // 기본 멀티캠퍼스로 표시
const DEFAULT_LNG = 127.0734734;
const { coords } = useGeolocation();
const mapKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

const map = ref<kakao.maps.Map | null>(null);
const userMarker = ref<kakao.maps.Marker | null>(null);
const partnerOverray = ref<kakao.maps.CustomOverlay[]>([]);
let centerInitialized = false; // 중앙 위치 초기화 여부

// useGeolocation이 비동기적으로 처리되면 사용자 위치 마커 갱신
watch(
  () => coords.value,
  (updated) => {
    const isValid = Number.isFinite(updated.latitude) && Number.isFinite(updated.longitude);
    if (isValid && map.value && !centerInitialized) {
      const newCenter = new kakao.maps.LatLng(updated.latitude, updated.longitude);
      map.value.setCenter(newCenter);
      centerInitialized = true;
      drawUserMarker(newCenter);
    }
  },
  { immediate: true }
);

// 파트너 마커 갱식
watch(
  () => partners,
  (partners) => {
    if (map.value && partners && partners.length > 0) {
      updatePartnerMarkers(partners);
    }
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    loadMap();
  } else {
    loadScript();
  }
});

const loadScript = () => {
  const script = document.createElement("script");
  script.id = "kakao-map-sdk";
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&autoload=false`;
  script.onload = () => kakao.maps.load(loadMap);
  document.head.appendChild(script);
};

const loadMap = () => {
  const container = document.getElementById("map");
  if (!container) return;
  const options = {
    center: new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LNG),
    level: 3,
  };
  map.value = new kakao.maps.Map(container, options);
  kakao.maps.event.addListener(map.value, "center_changed", onCenterChanged); // 중심 이동 이벤트 등록
};

const drawUserMarker = (position: kakao.maps.LatLng) => {
  // 마커가 없으면 새로 생성, 있으면 위치 변경
  if (!userMarker.value) {
    userMarker.value = createMarker(position, userMarkerImage, { width: 40, height: 50 });
  } else {
    userMarker.value.setPosition(position);
  }
};

const createMarker = (
  position: kakao.maps.LatLng,
  imageUrl: string,
  size: { width: number; height: number }
): kakao.maps.Marker => {
  const image = new kakao.maps.MarkerImage(imageUrl, new kakao.maps.Size(size.width, size.height));
  return new kakao.maps.Marker({ position, image, map: map.value! });
};

const createOverray = (
  positions: kakao.maps.LatLng,
  contents: string
): kakao.maps.CustomOverlay => {
  return new kakao.maps.CustomOverlay({
    position: positions,
    content: contents,
  });
};

const updatePartnerMarkers = (partners: Partner[]) => {
  // 기존 마커 제거
  partnerOverray.value.forEach((overlay) => overlay.setMap(null));
  partnerOverray.value = [];

  partners.forEach((partner) => {
    if (partner?.position) {
      const position = new kakao.maps.LatLng(
        parseFloat(partner.position.y),
        parseFloat(partner.position.x)
      );
      const markerImage = partner?.imageUrl ? partner.imageUrl : defaultPartnerMarkerImage;
      const imagehtml =
        '<div class="round-image">' +
        `<img src=${markerImage} />` +
        "</div>" +
        "<style>" +
        ".round-image {" +
        "display: flex;" +
        "justify-content: center;" +
        "align-items: center;" +
        "width: 40px;" +
        "height: 40px;" +
        "border-radius: 50%;" +
        "overflow: hidden;" +
        "border: 2px solid #ccc;" +
        "box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);" +
        "transition: border-color 0.3s ease;" +
        "}" +
        ".round-image:hover {" +
        "border-color: #F67154;" +
        "}" +
        ".round-image img {" +
        "width: 100%;" +
        "height: 100%;" +
        "object-fit: cover;" +
        "}" +
        "</style>";

      const overlay = createOverray(position, imagehtml);

      overlay.setMap(map.value);
      partnerOverray.value.push(overlay);
    }
  });
};

const onCenterChanged = () => {
  const center = map.value?.getCenter();
  if (center) {
    currentLat.value = center.getLat();
    currentLng.value = center.getLng();
  }
};
</script>
<template>
  <div id="map" class="size-full z-0"></div>
  <MoveToUserLocationButton :map="map" :coords="coords" />
</template>
