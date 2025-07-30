<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGeolocation } from "@vueuse/core";
import { getMAPartner } from "@/api/mapartner.api";
// import type { Partner } from "@/types/Partner";

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
const { coords } = useGeolocation();
const cName = ref<string>("편의점");

onMounted(async () => {
  if (document.getElementById("kakao-map-sdk")) return;

  const script = document.createElement("script");
  script.id = "kakao-map-sdk";

  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=drawing`;
  script.async = true;

  try {
    script.onload = async () => {
      const data = (await getMAPartner(cName.value, coords.value.latitude, coords.value.longitude)).partners;

      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");

          if (!container) return;

          const options = {
            center: new window.kakao.maps.LatLng(coords.value.latitude, coords.value.longitude),
            level: 1,
          };
          const mapInstance = new window.kakao.maps.Map(container, options);
          const MyPosition = new kakao.maps.LatLng(coords.value.latitude, coords.value.longitude);
          const MyMarker = new kakao.maps.Marker({
            position: MyPosition,
          });

          for (const partner of data) {
            if (partner?.position) {
              const partnerLatLng = new kakao.maps.LatLng(
                partner.position.x,
                partner.position.y
              );
              const marker = new kakao.maps.Marker({
                position: partnerLatLng,
              });
              marker.setMap(mapInstance);
            }
          }
          MyMarker.setMap(mapInstance);
        });
      } else {
        console.error("Kakao map SDK not available on window.");
      }
    };
  } catch (e) {
    console.error(e);
  }

  document.head.appendChild(script);
});
</script>

<template>
  <div id="map" style="width: 100%; height: 100vh"></div>
</template>
