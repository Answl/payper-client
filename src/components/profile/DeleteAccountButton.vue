<script setup lang="ts">
import { UserRoundX } from "lucide-vue-next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import MenuButton from "../MenuButton.vue";
import { useDeleteMeMutation } from "@/composables/user.query";
import { useRouter } from "vue-router";

const router = useRouter();

const { mutate } = useDeleteMeMutation({
  onSuccess: () => {
    router.replace("/landing");
  },
});

const onClick = () => {
  mutate();
};
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <MenuButton
        data-testid="withdrawal-button"
        :onClick="() => {}"
        label="회원탈퇴"
        :icon="UserRoundX"
      />
    </AlertDialogTrigger>
    <AlertDialogContent class="bg-white">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-stone-900">정말로 회원탈퇴 하시겠습니까?</AlertDialogTitle>
        <AlertDialogDescription class="text-stone-500">
          회원탈퇴가 처리된 이후에는 복구할 수 없습니다. 탈퇴시 일정 기간 이후 사용자의 모든
          데이터는 서비스에서 삭제됩니다.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="text-stone-900 hover:cursor-pointer">취소</AlertDialogCancel>
        <AlertDialogAction class="hover:cursor-pointer" :onClick="onClick"
          >회원탈퇴</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
