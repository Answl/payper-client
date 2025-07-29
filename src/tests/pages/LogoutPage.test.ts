import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, waitFor } from "@testing-library/vue";
import LogoutPage from "@/pages/LogoutPage.vue";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { setAccessToken, getAccessToken } from "@/utils/storage";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

const replaceMock = vi.fn();
vi.mock("vue-router", async () => {
  const actual = await vi.importActual<typeof import("vue-router")>("vue-router");
  return {
    ...actual,
    useRouter: () => ({
      replace: replaceMock,
    }),
  };
});

beforeEach(() => {
  setActivePinia(createPinia());
  useAuthStore().logOut();
  localStorage.clear();
});

describe("LogoutPage", () => {
  it("로그아웃 시 store, localStorage, 라우팅 정상 작동", async () => {
    // given
    const queryClient = new QueryClient();

    const authStore = useAuthStore();
    authStore.authenticate(); // isAuthenticated = true
    setAccessToken("dummy-token");

    // when
    render(LogoutPage, {
      global: {
        plugins: [[VueQueryPlugin, { queryClient }]],
      },
    });

    // 비동기 로직 처리 기다림
    await waitFor(() => {
      expect(authStore.isAuthenticated).toBeFalsy();
      expect(getAccessToken()).toBeNull();
      expect(replaceMock).toHaveBeenCalledWith("/landing");
    });
  });
});
