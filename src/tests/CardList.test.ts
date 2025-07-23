import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import CardList from "@/views/CardsPage.vue";
import type { Card } from "@/types/Card";

describe("CardList.vue", () => {
  it("마운트 시 카드 목록을 정상적으로 렌더링한다", async () => {
    // given
    const mockCards: Card[] = [
      {
        id: 1,
        name: "KB노리2",
        company: {
          id: 1,
          name: "KB국민카드",
          code: 101,
        },
        benefits: [
          {
            id: 1,
            target: "PARTNER",
            range: {
              start: 0,
              end: 300000,
            },
            discount: {
              type: "RATE",
              amount: 10,
              limitCount: 2,
              limitAmount: 1000,
            },
            category: {
              id: 1,
              name: "편의점",
            },
            partner: {
              id: 1,
              category: 1,
              name: "GS25",
            },
          },
        ],
      },
      {
        id: 2,
        name: "토스뱅크 체크카드",
        company: {
          id: 2,
          name: "토스뱅크",
          code: 102,
        },
        benefits: [],
      },
    ];

    // when - mock 서버 응답 설정
    server.use(http.get("/api/cards", () => HttpResponse.json({ cards: mockCards })));

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
