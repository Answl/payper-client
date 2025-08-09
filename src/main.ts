import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { useKakao } from "vue3-kakao-maps";

import { registerSW } from 'virtual:pwa-register';

// Browser에서 MSW 활성화
async function enableMocking() {
  // 개발 환경에서만 동작
  if (import.meta.env.VITE_MSW !== "true") {
    return;
  }
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

useKakao(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);

// 서비스 워커 등록
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("새 버전이 있습니다. 새로고침할까요?")) {
      updateSW();
    }
  },
  onOfflineReady() {
    console.log("앱이 오프라인에서도 준비되었습니다!");
  },
});

enableMocking().then(() => {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.use(VueQueryPlugin);

  app.mount("#app");
});
