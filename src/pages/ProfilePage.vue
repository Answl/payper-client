<script setup lang="ts">
import { useRouter } from "vue-router";
import CommonHeader from "@/components/CommonHeader.vue";
import { useMeQuery } from "@/composables/user.query";
import UserInfo from "@/components/profile/UserInfo.vue";
import MenuButton from "@/components/MenuButton.vue";
import { Pencil, UserRoundX } from "lucide-vue-next";
import BottomNavigation from "@/components/common/BottomNavigation.vue";

const router = useRouter();
const { data, isSuccess } = useMeQuery();

const editProfile = () => {
  router.push("/profile/edit");
};

const withdrawal = () => {
  console.log("회원탈퇴");
};

if (!isSuccess) {
  router.push("/landing");
}
</script>
<template>
  <div class="flex flex-col size-full gap-5">
    <CommonHeader title="프로필" />
    <div class="flex flex-col gap-10 size-full px-[30px]">
      <UserInfo v-if="data" :user="data" />
      <div class="flex flex-col size-full gap-5">
        <MenuButton
          data-testid="edit-profile-button"
          label="내 정보 수정하기"
          :icon="Pencil"
          :onClick="editProfile"
        />
        <MenuButton
          data-testid="withdrawal-button"
          label="회원탈퇴"
          :icon="UserRoundX"
          :onClick="withdrawal"
        />
      </div>
    </div>
    <BottomNavigation selected="profiles" />
  </div>
</template>
