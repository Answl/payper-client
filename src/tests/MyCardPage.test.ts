import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";

import type { Cards } from "@/types/Cards";
import type { Benefit } from "@/types/Benefit";
import type { CardCompany } from "@/types/CardCompany";

import { server } from "@/mocks/node";
import MyCardPage from "@/views/MyCardPage.vue";

vi.mock("vue-router");

describe("MyCardPage", () => {
  it("마운트 시 내 카드 목록을 표시합니다", async () => {
    // given
    const mockCompany: CardCompany = {
      id: 1,
      name: "Test Bank",
      code: 1001,
    };

    const mockBenefit: Benefit = {
      id: 1,
      target: "PARTNER",
      range: {
        start: 10,
        end: 20,
      },
      discount: {
        type: "RATE",
        amount: 5,
        limitCount: null,
        limitAmount: null,
      },
      partner: {
        id: 1,
        categoryId: 1,
        name: "GS25",
      },
      category: {
        id: 1,
        name: "편의점",
      },
    };

    const response: Cards = {
      cards: [
        {
          id: 1,
          name: "Nori2 Check Card",
          benefits: [mockBenefit],
          company: mockCompany,
        },
        {
          id: 2,
          name: "TeenUp Check Card",
          benefits: [mockBenefit],
          company: mockCompany,
        },
      ],
    };

    server.use(http.get("https://api.example.com/api/me/cards", () => HttpResponse.json(response)));

    // when
    render(MyCardPage);

    // then
    await waitFor(() => {
      response.cards.forEach((card) => {
        expect(screen.getByText(card.name)).toBeInTheDocument();

        const benefit = card.benefits[0];
        // expect(screen.queryAllByText(String(benefit.range.start)).length).toBeGreaterThan(1);
        // expect(screen.queryAllByText(String(benefit.range.end)).length).toBeGreaterThan(1);
        // expect(screen.queryAllByText(benefit.target).length).toBeGreaterThan(1);
        // expect(screen.queryAllByText(String(benefit.discount.rate)).length).toBeGreaterThan(1);
        // expect(screen.queryAllByText(benefit.discount.type).length).toBeGreaterThan(1);
        // expect(screen.queryAllByText(benefit.partner?.name ?? "").length).toBeGreaterThan(1);

        expect(screen.getAllByText(String(benefit.range.start)).length).toBeGreaterThan(1);
        expect(screen.getAllByText(String(benefit.range.end)).length).toBeGreaterThan(1);
        expect(screen.getAllByText(benefit.target).length).toBeGreaterThan(1);
        expect(screen.getAllByText(String(benefit.discount.amount)).length).toBeGreaterThan(1);
        expect(screen.getAllByText(benefit.discount.type).length).toBeGreaterThan(1);
        expect(screen.getAllByText(benefit.partner?.name ?? "").length).toBeGreaterThan(1);
      });
    });
  });
});
