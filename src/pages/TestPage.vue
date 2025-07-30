<script setup lang="ts">
import PageHolder from "@/components/common/PageHolder.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import HomeSearchBar from "@/components/home/HomeSearchBar.vue";
import MenuButton from "@/components/MenuButton.vue";
import SelectDrawerButton from "@/components/search/SelectDrawerButton.vue";
import { LogOut } from "lucide-vue-next";
import { ref } from "vue";
const options = ["Option 1-1", "Option 1-2", "Option 1-3"];
const options2 = ["Option 2-1", "Option 2-2", "Option 2-3"];
const options3 = ["Option 3-1", "Option 3-2", "Option 3-3"];
const selected = ref<string[]>([]);
</script>

<template>
  <PageHolder title="Test" bottomNavigation>
    <div class="flex flex-col gap-10 p-5">
      <SearchBar
        :onClick="
          () => {
            console.log('click!');
          }
        "
        placeholder="검색어를 입력하세요"
      />
      <MenuButton :onClick="() => console.log('Clicked!')" :icon="LogOut" label="로그아웃" />
      <div class="flex flex-col gap-5">
        <div>선택됨: {{ selected }}</div>
        <div class="flex gap-2">
          <SelectDrawerButton label="Label 1" :options="options" v-model:selected="selected" />
          <SelectDrawerButton label="Label 2" :options="options2" v-model:selected="selected" />
          <SelectDrawerButton label="Label 3" :options="options3" v-model:selected="selected" />
        </div>
      </div>
      <HomeSearchBar :onSubmit="(data) => console.log('검색: ' + data)" />
    </div>
  </PageHolder>
</template>
