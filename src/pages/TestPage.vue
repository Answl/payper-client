<script setup lang="ts">
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import CommonHeader from "@/components/CommonHeader.vue";
import MenuButton from "@/components/MenuButton.vue";
import { LogOut } from "lucide-vue-next";
</script>

<template>
  <div class="flex flex-col gap-10 p-5">
    <CommonHeader title="Test" />
    <SearchBar
      :onClick="
        () => {
          console.log('click!');
        }
      "
      placeholder="검색어를 입력하세요"
    />
    <MenuButton :onClick="() => console.log('Clicked!')" :icon="LogOut" label="로그아웃" />
    <BottomNavigation selected="home" />
  </div>
</template>
