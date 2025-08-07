<script setup lang="ts">
import type { Partner } from "@/types/Partner";
import { ref, watch } from "vue";
import PartnerDrawerItem from "./PartnerDrawerItem.vue";
import PartnerCardList from "@/components/partner/PartnerList.vue";

const { partners, height } = defineProps<{
  partners: Partner[] | undefined;
  height: number;
}>();

const emit = defineEmits<{
  "height-change": [height: number];
}>();

const drawerHeight = ref(height);
const selectedPartner = ref<Partner | null>(null);

const handleSelectPartner = (partner: Partner) => {
  selectedPartner.value = partner;
  drawerHeight.value = 60;
  emit("height-change", 60);
};

const handleBack = () => {
  selectedPartner.value = null;
  drawerHeight.value = 50;
  emit("height-change", 50);
};

// 드로우 높이 동기화
watch(
  () => height,
  (newHeight) => {
    drawerHeight.value = newHeight;
  }
);

// partners 바뀌면 드로우 올리기
watch(
  () => partners,
  (newPartners, oldPartners) => {
    if (oldPartners !== undefined && newPartners && newPartners.length > 0) {
      drawerHeight.value = 50;
      emit("height-change", 50);
    }
  }
);

// 드래그 동작
const isDragging = ref(false);

const startDrag = (e: MouseEvent | TouchEvent) => {
  e.preventDefault();
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
  const newHeight = Math.min(Math.max(vh, 12), 80);
  drawerHeight.value = newHeight;
  emit("height-change", newHeight);
};
</script>

<template>
  <div
    class="absolute bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-20 transition-all duration-300 px-5"
    :style="{ height: `${drawerHeight}vh` }"
  >
    <div
      class="flex justify-center items-center w-full py-3 cursor-pointer"
      @mousedown="startDrag"
      @touchstart="startDrag"
    >
      <div class="w-12 h-1.5 bg-stone-200 rounded-full" />
    </div>

    <div class="flex flex-col gap-3 overflow-y-auto h-[calc(100%-4rem)] pb-24">
      <div
        v-if="!partners || partners.length === 0"
        class="text-center text-stone-400 py-10 text-sm"
      >
        검색 결과가 없습니다.
      </div>

      <template v-else-if="!selectedPartner">
        <PartnerDrawerItem
          v-for="partner in partners"
          :key="partner.id"
          :partner="partner"
          @select-partner="handleSelectPartner"
        />
      </template>

      <template v-else>
        <PartnerCardList :partner="selectedPartner" @back="handleBack" />
      </template>
    </div>
  </div>
</template>
