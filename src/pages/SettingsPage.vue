<script setup lang="ts">
import { useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, LogOut } from "lucide-vue-next";

const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const logout = () => {
  router.push("/logout");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
      <h2 class="text-center font-semibold text-lg mb-6">메뉴</h2>

      <div class="space-y-4">
        <Button
          variant="ghost"
          class="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
          @click="goToProfile"
        >
          <div class="flex items-center space-x-2 text-gray-800">
            <User class="w-5 h-5" />
            <span>내 정보</span>
          </div>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </Button>

        <Button
          variant="ghost"
          class="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 shadow-sm"
          @click="logout"
          data-testid="LogoutButtonTest"
        >
          <div class="flex items-center space-x-2 text-gray-800">
            <LogOut class="w-5 h-5" />
            <span>로그아웃</span>
          </div>
          <ChevronRight class="w-4 h-4 text-gray-400" />
        </Button>
      </div>
    </div>
  </div>
</template>
