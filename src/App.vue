<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>

<template>
  <Toaster />
  <div class="flex flex-col justify-center items-center bg-stone-100 text-neutral-900">
    <main
      class="flex overflow-x-hidden overflow-y-auto items-center justify-center w-full h-screen max-w-2xl bg-white"
    >
      <RouterView />
    </main>
  </div>
</template>
