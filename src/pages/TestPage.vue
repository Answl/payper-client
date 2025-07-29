<script setup lang="ts">
import SearchBar from "@/components/common/SearchBar.vue";
import CommonHeader from "@/components/CommonHeader.vue";
</script>

<template>
  <CommonHeader title="Test" />
  <SearchBar
    :onClick="
      () => {
        console.log('click!');
      }
    "
    placeholder="검색어를 입력하세요"
  />
</template>
