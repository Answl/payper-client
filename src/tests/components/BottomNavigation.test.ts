import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { mockPush } from "@/../__mocks__/vue-router";

import BottomNavigation from "@/components/common/BottomNavigation.vue";

vi.mock("vue-router");

describe("BottomNavigation", () => {
  it("각 네비게이션 아이템을 클릭하면 해당 라우트로 이동합니다.", async () => {
    // given
    render(BottomNavigation, {
      props: {
        selected: "home",
      },
    });

    const user = userEvent.setup();

    const expectedRoutes = ["myCards", "cards", "home", "profile", "more"];

    for (const routeName of expectedRoutes) {
      const item = await screen.findByTestId(`nav-item-${routeName}`);

      // when
      await user.click(item);

      // then
      expect(mockPush).toHaveBeenCalledWith({ name: routeName });
    }
  });
});
