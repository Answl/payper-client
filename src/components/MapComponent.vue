<script setup lang="ts">
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

const { lat, lng } = defineProps<{
  lat: number;
  lng: number;
}>();
</script>
<template>
  <KakaoMap :lat="lat" :lng="lng" :draggable="true">
    <KakaoMapMarker :lat="lat" :lng="lng" />
  </KakaoMap>
</template>
