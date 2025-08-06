<script setup lang="ts">
import type { Partner } from "@/types/Partner";
import { ref, watch } from "vue";
import PartnerDrawerItem from "./PartnerDrawerItem.vue";

const { partners, height } = defineProps<{
  partners: Partner[] | undefined;
  height: number;
}>();

const emit = defineEmits<{
  "height-change": [height: number];
}>();

// props의 height가 변경되면 drawerHeight 동기화
watch(
  () => height,
  (newHeight) => {
    drawerHeight.value = newHeight;
  }
);

// partners 데이터가 변경될 때 drawer를 중앙으로 올림
watch(
  () => partners,
  (newPartners, oldPartners) => {
    // 초기 로딩이 아닌 경우에만 실행 (oldPartners가 존재하는 경우)
    if (oldPartners !== undefined && newPartners && newPartners.length > 0) {
      drawerHeight.value = 50;
      emit("height-change", 50);
    }
  }
);

const drawerHeight = ref(height);
const isDragging = ref(false);

const startDrag = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
  e.stopPropagation();

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

  e.preventDefault();
  e.stopPropagation();

  const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
  const windowHeight = window.innerHeight;
  const vh = ((windowHeight - clientY) / windowHeight) * 100;
  const newHeight = Math.min(Math.max(vh, 12), 80);
  drawerHeight.value = newHeight;
  emit("height-change", newHeight);
};

watch(
  () => partners,
  (newPartners) => {
    console.log("Partners changed:", newPartners);
  }
);
</script>

<template>
  <div
    class="absolute flex flex-col gap-3 bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-20 transition-all duration-300 px-5"
    :style="{ height: `${drawerHeight}vh` }"
  >
    <div
      class="flex justify-center items-center w-full py-3 cursor-pointer"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="w-12 h-1.5 bg-stone-200 rounded-full" />
    </div>
    <div v-if="!partners || partners.length == 0" class="text-center text-stone-400 py-10 text-sm">
      검색 결과가 없습니다.
    </div>
    <div v-else class="flex flex-col gap-3 overflow-y-auto h-[calc(100%-4rem)] pb-24">
      <PartnerDrawerItem v-for="(partner, index) in partners" :key="index" :partner="partner" />
    </div>
  </div>
</template>
