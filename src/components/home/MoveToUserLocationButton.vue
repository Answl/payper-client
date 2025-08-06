<script setup lang="ts">
import { Locate } from "lucide-vue-next";
import CommonButton from "../ui/button/CommonButton.vue";

const props = defineProps<{
  map: kakao.maps.Map | null;
  coords: { latitude: number; longitude: number };
}>();

const moveToUserLocation = () => {
  const { latitude, longitude } = props.coords;
  const isValid = Number.isFinite(latitude) && Number.isFinite(longitude);

  if (isValid && props.map) {
    const position = new kakao.maps.LatLng(latitude, longitude);
    props.map.setCenter(position);
  } else {
    alert("사용자 위치 정보를 가져올 수 없습니다.");
  }
};
</script>

<template>
  <CommonButton
    class="absolute right-3 top-44 z-20 shadow-lg size-10 text-blue-400 bg-white rounded-full p-2 border hover:bg-stone-100 transition"
    @click="moveToUserLocation"
  >
    <Locate />
  </CommonButton>
</template>
