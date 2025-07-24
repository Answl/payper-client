import { server } from "@/mocks/node";
import KakaoCallbackPage from "@/pages/KakaoCallbackPage.vue";
import { useAuthStore } from "@/stores/authStore";
import type { LoginResponse } from "@/types/LoginResponse";
import { getAccessToken } from "@/utils/storage";
import { render, waitFor } from "@testing-library/vue";
import { http, HttpResponse } from "msw";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockRoute } = vi.hoisted(() => ({
  mockRoute: vi.fn(),
}));

const mockPush = vi.fn();

vi.mock("vue-router", async () => {
  const actual = await vi.importActual<typeof import("vue-router")>("vue-router");
  return {
    ...actual,
    useRouter: () => ({
      push: mockPush,
    }),
    useRoute: mockRoute,
  };
});

beforeEach(() => {
  setActivePinia(createPinia());
  useAuthStore().logOut();
  localStorage.clear();
});

describe("KakaoCallbackPage", () => {
  const code = "code";

  it("code가 없으면 Landing으로 강제 이동", async () => {
    // given
    mockRoute.mockReturnValue({
      params: {},
    });

    // when
    render(KakaoCallbackPage);

    // then
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/landing");
    });
  });

  it("code로 서버에 로그인 요청 후, 인증 처리 및 Home으로 이동", async () => {
    // given
    mockRoute.mockReturnValue({
      params: {
        code: code,
      },
    });

    server.use(
      http.post<never, never, LoginResponse>(
        "https://api.example.com/api/auth/login/kakao",
        async () =>
          HttpResponse.json({
            accessToken: "accessToken",
          })
      )
    );

    const authStore = useAuthStore();

    // when
    render(KakaoCallbackPage);

    // then
    await waitFor(() => {
      expect(authStore.isAuthenticated).toBeTruthy();
      expect(mockPush).toHaveBeenCalledWith("/");
      expect(getAccessToken()).not.toBeNull();
    });
  });

  it("로그인 실패 시, Landing으로 이동", async () => {
    // given
    server.use(
      http.post("https://api.example.com/api/auth/login/kakao", async () =>
        HttpResponse.json({}, { status: 403 })
      )
    );

    const authStore = useAuthStore();

    // when
    render(KakaoCallbackPage);

    // then
    await waitFor(() => {
      expect(authStore.isAuthenticated).toBeFalsy();
      expect(mockPush).toHaveBeenCalledWith("/landing");
      expect(getAccessToken()).toBeNull();
    });
  });
});
