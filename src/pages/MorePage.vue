<script setup lang="ts">
import { useRouter } from "vue-router";

import { LogOut } from "lucide-vue-next";
import CommonHeader from "@/components/CommonHeader.vue";
import MenuButton from "@/components/MenuButton.vue";
import BottomNavigation from "@/components/common/BottomNavigation.vue";

const router = useRouter();

const logout = () => {
  router.push("/logout");
};
</script>

<template>
  <div class="flex flex-col size-full">
    <CommonHeader title="더보기" />
    <div class="flex flex-col p-[30px] size-full">
      <MenuButton
        data-testid="logout-button"
        :label="'로그아웃'"
        :icon="LogOut"
        :onClick="logout"
      />
    </div>
    <BottomNavigation selected="more" />
  </div>
</template>
