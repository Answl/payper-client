<script setup lang="ts">
import { onMounted } from 'vue';
import { useGeolocation } from '@vueuse/core'
// import type { Partners } from "@/types/Partners";
// import { getMAPartner } from "@/api/mapartner.api";

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
const { coords } = useGeolocation()
// const partnersForthisPage = ref<Partners | null>(null);
// const cName = ref<string>("편의점")

onMounted(async () => {
  if (document.getElementById('kakao-map-sdk')) return;

  const script = document.createElement('script');
  script.id = 'kakao-map-sdk';

  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=drawing`;
  script.async = true;

//  partnersForthisPage.value = await getMAPartner("편의점",coords.value.latitude, coords.value.longitude);
//  const MyPosition = new kakao.maps.LatLng(33.450701, 126.570667);
//  const MyMarker = new kakao.maps.Marker({
//    position: MyPosition
// });

  script.onload = () => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (container) {
          const options = {
            center: new window.kakao.maps.LatLng(coords.value.latitude, coords.value.longitude),
            level: 1
          };
          const mapInstance = new window.kakao.maps.Map(container, options);
          // const MyPosition = new kakao.maps.LatLng(33.450701, 126.570667);
           const MyPosition = new kakao.maps.LatLng(coords.value.latitude, coords.value.longitude);
          const MyMarker = new kakao.maps.Marker({
          position: MyPosition
        });
          // const map = new window.kakao.maps.Map(container,options);
          MyMarker.setMap(mapInstance)
        }
      });
    } else {
      console.error("Kakao map SDK not available on window.");
    }
  };
  document.head.appendChild(script);
});
</script>

<template>
  <div id="map" style="width: 100%; height: 100vh;"></div>
</template>



