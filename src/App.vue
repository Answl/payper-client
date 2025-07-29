<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex flex-col justify-center items-center bg-stone-100 text-neutral-900">
    <main
      class="flex overflow-x-hidden overflow-y-auto items-center justify-center w-full h-screen max-w-lg bg-white"
    >
      <RouterView />
    </main>
  </div>
</template>
