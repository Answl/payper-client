import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { mockPush } from "@/../__mocks__/vue-router";

import BottomNavigation from "@/components/common/BottomNavigation.vue";

vi.mock("vue-router");

describe("BottomNavigation", () => {
  const user = userEvent.setup();

  it("각 네비게이션 아이템을 클릭하면 해당 라우트로 이동합니다.", async () => {
    // given
    render(BottomNavigation);

    const items = await screen.findAllByTestId("item");
    const expectedRoutes = ["myCards", "home", "cards"];

    // when then
    await waitFor(() => {
      for (let i = 0; i < items.length; i++) {
        user.click(items[i]);

        expect(mockPush).toHaveBeenCalledWith({
          name: expectedRoutes[i],
        });
      }
    });
  });
});
