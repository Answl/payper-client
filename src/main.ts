import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { useKakao } from "vue3-kakao-maps";

// Browser에서 MSW 활성화
async function enableMocking() {
  // 개발 환경에서만 동작
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

useKakao(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);

enableMocking().then(() => {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.use(VueQueryPlugin);

  app.mount("#app");
});
