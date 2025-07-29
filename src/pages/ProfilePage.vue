<script setup lang="ts">
import { useRouter } from "vue-router";
import { CommonButton } from "@/components/ui/button";
import { ChevronRight, Pencil, LogOut, UserX, ArrowLeft } from "lucide-vue-next";

const router = useRouter();

const back = () => router.back();
// 프로필 수정 기능 추가 예정
const editInfo = () => router.push("/profile/edit");
const logout = () => router.push("/logout");
// 계정 삭제 기능 추가 예정
const deleteAccount = () => router.push("/delete-account");
</script>
<template>
  <div class="min-h-screen bg-gray-100 px-4 py-8">
    <div class="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
      <div class="flex items-center justify-between mb-6">
        <ArrowLeft class="w-5 h-5 text-gray-600 cursor-pointer" @click="back" />
        <h2 class="text-lg font-semibold text-center flex-1 -ml-5">내 정보</h2>
      </div>

      <div class="mb-6 px-2">
        <p class="text-base font-bold text-gray-800">김종이</p>
        <p class="text-sm text-gray-500">000-0000-0000</p>
      </div>

      <CommonButton
        as="button"
        variant="ghost"
        class="w-full flex justify-between items-center border px-4 py-4 rounded-md shadow-sm mb-6"
        @click="editInfo"
      >
        <div class="flex items-center space-x-2 text-gray-800">
          <Pencil class="w-5 h-5" />
          <span>내 정보 수정하기</span>
        </div>
        <ChevronRight class="w-4 h-4 text-gray-400" />
      </CommonButton>

      <CommonButton
        as="button"
        variant="ghost"
        class="w-full flex justify-between items-center border px-4 py-4 rounded-md shadow-sm mb-6"
        @click="logout"
      >
        <div class="flex items-center space-x-2 text-gray-800">
          <LogOut class="w-5 h-5" />
          <span>로그아웃</span>
        </div>
        <ChevronRight class="w-4 h-4 text-gray-400" />
      </CommonButton>

      <CommonButton
        as="button"
        variant="ghost"
        class="w-full flex justify-between items-center border px-4 py-4 rounded-md shadow-sm"
        @click="deleteAccount"
      >
        <div class="flex items-center space-x-2 text-gray-800">
          <UserX class="w-5 h-5" />
          <span>회원탈퇴</span>
        </div>
        <ChevronRight class="w-4 h-4 text-gray-400" />
      </CommonButton>
    </div>
  </div>
</template>
