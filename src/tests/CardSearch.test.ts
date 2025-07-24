import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/vue";
import CardSearch from "@/views/CardListPage.vue";

describe("CardSearch", () => {
  it("검색어를 입력하여 검색하면 결과가 필터링되어 표시됩니다", async () => {
    //when
    render(CardSearch);

    const input = screen.getByPlaceholderText("카드 이름을 입력하세요");
    const button = screen.getByText("검색");

    await fireEvent.update(input, "토스");
    await fireEvent.click(button);

    //then
    await waitFor(() => {
      expect(screen.getByText("토스뱅크 체크카드")).toBeInTheDocument();
    });
  });
});
