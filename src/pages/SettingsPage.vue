<script setup lang="ts">
import { useRouter } from "vue-router";

import { ChevronRight, User, LogOut, X } from "lucide-vue-next";
import { CommonButton } from "@/components/ui/button";

const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const logout = () => {
  router.push("/logout");
};

const goToHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
      <div class="flex justify-end mb-2">
        <X class="w-5 h-5 text-gray-800 cursor-pointer" @click="goToHome" />
      </div>

      <div class="mb-6">
        <h2 class="text-lg font-semibold text-center text-gray-900">메뉴</h2>
      </div>

      <div class="space-y-4">
        <CommonButton
          variant="ghost"
          class="w-full flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 shadow-sm"
          @click="goToProfile"
        >
          <div class="flex items-center space-x-2 text-gray-800">
            <User class="w-5 h-5" />
            <span>내 정보</span>
          </div>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </CommonButton>

        <CommonButton
          variant="ghost"
          class="w-full flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 shadow-sm"
          @click="logout"
          data-testid="LogoutButtonTest"
        >
          <div class="flex items-center space-x-2 text-gray-800">
            <LogOut class="w-5 h-5" />
            <span>로그아웃</span>
          </div>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </CommonButton>
      </div>
    </div>
  </div>
</template>
