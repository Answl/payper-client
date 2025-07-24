import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import CardList from "@/views/CardListPage.vue";
import type { Cards } from "@/types/Cards";

describe("CardList.vue", () => {
  it("마운트 시 카드 목록을 정상적으로 렌더링한다", async () => {
    // given
     const mockCards: Cards = {
      cards : [
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
    ]
  };

    // when - mock 서버 응답 설정
    server.use(http.get("/api/cards", () => HttpResponse.json( mockCards )));

    // render
    render(CardList);

    // then
    await waitFor(() => {
      expect(screen.getByText("KB노리2")).toBeInTheDocument();
      expect(screen.getByText("토스뱅크 체크카드")).toBeInTheDocument();
      expect(screen.getByText("KB국민카드")).toBeInTheDocument();
      expect(screen.getByText("토스뱅크")).toBeInTheDocument();
    });
  });
});
