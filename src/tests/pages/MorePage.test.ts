import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import MorePage from "@/pages/MorePage.vue";

const mockPush = vi.fn();

vi.mock("vue-router", async () => {
  const actual = await vi.importActual<typeof import("vue-router")>("vue-router");

  return {
    ...actual,
    useRouter: () => ({
      push: mockPush,
    }),
  };
});

describe("SettingsPage", () => {
  const user = userEvent.setup();

  it("마운트 후 로그아웃 버튼 확인", async () => {
    //given
    //아직 없음

    //when
    render(MorePage);

    //then
    await waitFor(() => {
      expect(screen.getByTestId("logout-button")).toBeInTheDocument();
    });
  });

  it("로그아웃 버튼을 누르면 /logout으로 이동한다", async () => {
    //given
    render(MorePage);
    const logoutButton = screen.getByTestId("logout-button");

    //when
    await user.click(logoutButton);

    //then
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/logout");
    });
  });
});
