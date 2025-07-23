import { beforeEach, describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/vue";
import LandingPage from "@/pages/LandingPage.vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/stores/authStore";

// 목함수
const { getAccessTokenMock } = vi.hoisted(() => ({
  getAccessTokenMock: vi.fn(),
}));

const mockPush = vi.fn();
// const getAccessTokenMock = vi.fn();

// 모킹
vi.mock("@/utils/storage", () => ({
  getAccessToken: getAccessTokenMock,
}));

vi.mock("vue-router", async () => {
  const actual = await vi.importActual<typeof import("vue-router")>("vue-router");
  return {
    ...actual,
    useRouter: () => ({
      push: mockPush,
    }),
    useRoute: () => ({
      query: {
        redirect: "/redirect",
      },
    }),
  };
});

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("LandingPage", () => {
  const user = userEvent.setup();

  it("'카카오톡 로그인' 버튼을 클릭하면 카카오톡 인증 URL로 이동한다", async () => {
    // given
    getAccessTokenMock.mockReturnValue(null);

    // 외부 리다이렉션을 모킹합니다
    const assignMock = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = { assign: assignMock };

    render(LandingPage);

    const kakaoLoginButton = screen.getByTestId("kakao-login-button");

    // when
    user.click(kakaoLoginButton);

    // then
    await waitFor(() => {
      expect(assignMock).toHaveBeenCalled();
    });
  });

  describe("마운트 시 비인증 상태인 경우", () => {
    it("로컬 스토리지에 엑세스 토큰이 없는 경우, 아무것도 하지 않는다", async () => {
      // given
      getAccessTokenMock.mockReturnValue(null);
      const authStore = useAuthStore();
      authStore.logOut();

      // when
      render(LandingPage);

      // then
      await waitFor(() => {
        expect(authStore.isAuthenticated).toBeFalsy();
      });
    });

    it("로컬 스토리지에 엑세스 토큰이 있는 경우, 인증을 시도하고 redirect로 리다이렉션 한다", async () => {
      // given
      getAccessTokenMock.mockReturnValue("mock");
      const authStore = useAuthStore();
      authStore.logOut();

      server.use(http.get("https://api.example.com/api/users/me", () => HttpResponse.json({})));

      // when
      render(LandingPage);

      // then
      await waitFor(() => {
        expect(authStore.isAuthenticated).toBeTruthy();
        expect(mockPush).toBeCalledWith("/redirect");
      });
    });
  });
});
