import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import type { Cards } from "@/types/Cards";
import CardListPage from "@/pages/CardListPage.vue";
import { mockPush } from "@/../__mocks__/vue-router";

vi.mock("vue-router");

describe("CardListPage.vue", () => {
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

  it("마운트 시 카드 목록을 표시한다", async () => {
    server.use(http.get("/api/cards", () => HttpResponse.json(mockCards)));
    render(CardListPage);

    await waitFor(() => {
      expect(screen.getByText("KB노리2")).toBeInTheDocument();
      expect(screen.getByText("토스뱅크 체크카드")).toBeInTheDocument();
      expect(screen.getByText("KB국민카드")).toBeInTheDocument();
      expect(screen.getByText("토스뱅크")).toBeInTheDocument();
    });
  });

  // 내부 필터링이 아닌 API 호출로 검색 구현 예정 -> 해당 테스트는 주석 처리
  // it("검색어를 입력하여 검색하면 결과가 필터링되어 표시된다", async () => {
  //   //npm install 후 재 커밋을 위한 주석
  //   render(CardListPage);

  //   const input = screen.getByPlaceholderText("카드 이름을 입력하세요");
  //   const button = screen.getByText("검색");

  //   await fireEvent.update(input, "토스");
  //   await fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(screen.getByText("토스뱅크 체크카드")).toBeInTheDocument();
  //   });
  // });

  it("카드 아이템을 클릭하면 카드 상세 페이지로 이동한다", async () => {
    server.use(http.get("/api/cards", () => HttpResponse.json(mockCards)));
    render(CardListPage);

    const items = await screen.findAllByTestId("cardItem");

    await fireEvent.click(items[0]);
    expect(mockPush).toHaveBeenCalledWith({
      name: "cardDetails",
      params: { id: mockCards.cards[0].id },
    });

    await fireEvent.click(items[1]);
    expect(mockPush).toHaveBeenCalledWith({
      name: "cardDetails",
      params: { id: mockCards.cards[1].id },
    });
  });
});
