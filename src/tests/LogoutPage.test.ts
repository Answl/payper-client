import LogoutPage from "@/views/LogoutPage.vue";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import axios from "axios";
import { getAccessToken, setAccessToken } from "@/utils/storage";
import { useAuthStore } from "@/stores/authStore";
import { createPinia, setActivePinia } from "pinia";

vi.mock("axios");

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

describe("LogoutPage", () => {
  const postMock = axios.post as unknown as ReturnType<typeof vi.fn>;
  postMock.mockResolvedValue({});

  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it("로그아웃 페이지 마운트시 isAuthenticated->false", async () => {
    //pre
    const authStore = useAuthStore();

    //given
    authStore.authenticate();

    //when
    await mount(LogoutPage);

    //then
    expect(authStore.isAuthenticated).toBeFalsy();
  });

  it("로그아웃 페이지 마운트시 localStorage에 accessToken제거", async () => {
    //pre
    const originToken = getAccessToken();

    //given
    setAccessToken("dummy-token");

    //when
    await mount(LogoutPage);

    //then
    expect(getAccessToken()).toBeNull();

    //after
    setAccessToken(originToken ? originToken : "");
  });

  it("로그아웃 페이지 마운트시 쿠키 지우는 api 서버에 요청", async () => {
    //given
    //없음

    //when
    await mount(LogoutPage);

    //then
    expect(postMock).toHaveBeenCalledExactlyOnceWith("/logout");
  });

  it("로그아웃 완료 후 홈 페이지로 이동", async () => {
    //given

    //when
    await mount(LogoutPage);

    //then
    expect(replaceMock).toHaveBeenCalledWith("/");
  });
});
