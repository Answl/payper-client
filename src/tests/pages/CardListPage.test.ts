import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import type { Cards } from "@/types/Cards";
import CardListPage from "@/pages/CardListPage.vue";

describe("CardList.vue", () => {
  it("마운트 시 카드 목록을 정상적으로 렌더링한다", async () => {
    // given
    const mockCards: Cards = {
      cards: [
        {
          id: 1,
          name: "KB노리2",
          type: "CREDIT",
          imageUrl: "https://example.com/kbcard.png",
          company: {
            id: 1,
            name: "KB국민카드",
          },
          benefits: [],
          annualCosts: [],
          grades: [],
        },
        {
          id: 2,
          name: "토스뱅크 체크카드",
          type: "CHECK",
          imageUrl: "https://example.com/toss.png",
          company: {
            id: 2,
            name: "토스뱅크",
          },
          benefits: [],
          annualCosts: [],
          grades: [],
        },
      ],
    };

    // when - mock 서버 응답 설정
    server.use(http.get("/api/cards", () => HttpResponse.json(mockCards)));

    // render
    render(CardListPage);

    // then
    await waitFor(() => {
      expect(screen.getByText("KB노리2")).toBeInTheDocument();
      expect(screen.getByText("토스뱅크 체크카드")).toBeInTheDocument();
      expect(screen.getByText("KB국민카드")).toBeInTheDocument();
      expect(screen.getByText("토스뱅크")).toBeInTheDocument();
    });
  });

  it("검색어를 입력하여 검색하면 결과가 필터링되어 표시됩니다", async () => {
    //when
    render(CardListPage);

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
