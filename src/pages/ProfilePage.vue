<script setup lang="ts">
import { useRouter } from "vue-router";
import CommonHeader from "@/components/CommonHeader.vue";
import { useMeQuery } from "@/composables/user.query";
import UserInfo from "@/components/profile/UserInfo.vue";
import BottomNavigation from "@/components/common/BottomNavigation.vue";
import DeleteAccountButton from "@/components/profile/DeleteAccountButton.vue";

const router = useRouter();
const { data, isSuccess } = useMeQuery();

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
        <DeleteAccountButton />
      </div>
    </div>
    <BottomNavigation selected="profiles" />
  </div>
</template>
