<script setup lang="ts">
const sortOption = defineModel<string>({ default: "benefit" });
</script>

<template>
  <div>
    <div class="border-b border-gray-200 mx-10 mb-4 mt-2"></div>
    <div class="flex justify-end mb-4 px-10">
      <select v-model="sortOption" class="border rounded px-2 py-1 text-sm">
        <option value="benefit">혜택 높은순</option>
        <option value="fee">연회비 낮은순</option>
      </select>
    </div>
  </div>
</template>
