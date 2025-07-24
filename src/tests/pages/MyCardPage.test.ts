import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { userEvent } from "@testing-library/user-event";

import type { Cards } from "@/types/Cards";

import { server } from "@/mocks/node";
import { mockPush } from "@/../__mocks__/vue-router";
import MyCardPage from "@/pages/MyCardPage.vue";
import { baseURL } from "@/api/axios";

vi.mock("vue-router");

describe("MyCardPage", () => {
  const user = userEvent.setup();

  const mockCards: Cards = {
    cards: [
      {
        id: 1,
        name: "Nori2 Check Card",
        type: "CHECK",
        imageUrl: "https://example.com/kb.png",
        company: {
          id: 1,
          name: "Test Bank",
        },
        benefits: [
          {
            id: 1,
            title: "GS25 할인",
            summary: "편의점 할인 혜택",
            description: "<p>월 최대 1,000원 할인</p>",
            iconUrl: "https://example.com/gs25.png",
            limit: {
              limitCountPerDay: null,
              limitCountPerMonth: 2,
              limitAmountPerPay: 1000,
            },
            benefitGrades: [
              {
                id: 1,
                grade: {
                  id: 1,
                  start: 0,
                  end: 300000,
                  totalDiscount: 2000,
                },
                discount: {
                  type: "RATE",
                  amount: 5,
                  limitCount: null,
                  limitAmount: null,
                },
              },
            ],
            categories: [
              {
                id: 1,
                name: "편의점",
              },
            ],
            partners: [
              {
                id: 1,
                name: "GS25",
                myCards: [],
              },
            ],
            minPayment: 1000,
          },
        ],
        annualCosts: [],
        grades: [],
      },
    ],
  };

  it("마운트 시 내 카드 목록을 표시합니다", async () => {
    server.use(http.get(baseURL + "/me/cards", () => HttpResponse.json(mockCards)));

    render(MyCardPage);

    await waitFor(() => {
      expect(screen.getByText("Nori2 Check Card")).toBeInTheDocument();
      expect(screen.getByText("Test Bank")).toBeInTheDocument();
      expect(screen.getByText("편의점")).toBeInTheDocument();
      expect(screen.getByText("GS25")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });

  it("카드 아이템을 클릭하면 카드 상세 페이지로 이동합니다", async () => {
    server.use(http.get(baseURL + "/me/cards", () => HttpResponse.json(mockCards)));

    render(MyCardPage);
    const button = await screen.findByTestId("cardItem");

    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith({
      name: "cardsDetails",
      params: { id: mockCards.cards[0].id },
    });
  });
});
