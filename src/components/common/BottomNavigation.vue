<script setup lang="ts">
import { useRouter } from "vue-router";

const navigations = [
  {
    id: 1,
    title: "내 카드",
    path: "/my/cards",
    name: "myCards",
  },
  {
    id: 2,
    title: "지도",
    path: "/",
    name: "home",
  },
  {
    id: 3,
    title: "카드 찾기",
    path: "/cards",
    name: "cards",
  },
];

const router = useRouter();

const onClick = (name: string) => {
  router.push({ name: name });
};
</script>

<template>
  <ul>
    <li v-for="navigation in navigations" :key="navigation.id" @click="onClick(navigation.name)">
      <div data-testid="item">
        <!-- <img src="" alt=""> -->
        <p>{{ navigation.title }}</p>
      </div>
    </li>
  </ul>
</template>
