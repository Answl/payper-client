import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";

import type { Cards } from "@/types/Cards";
import type { Benefit } from "@/types/Benefit";
import { server } from "@/mocks/node";
import MyCardPage from "@/views/MyCardPage.vue";

vi.mock("vue-router");

describe("PostsPage", () => {
  it("마운트 시 내 카드 목록을 표시합니다", async () => {
    // given
    const benefit: Benefit[] = [
      {
        id: 1,
        target: "PARTNER",
        range: {
          start: 10,
          end: 20,
        },
        discount: {
          type: "RATE",
          amount: 5,
        },
        partner: {
          id: 1,
          categoryId: 1,
          name: "GS25",
        },
      },
    ];

    const response: Cards = {
      cards: [
        {
          id: 1,
          name: "Nori2 Check Card",
          benefits: benefit,
        },
        {
          id: 2,
          name: "TeenUp Check Card",
          benefits: benefit,
        },
      ],
    };

    server.use(
      http.get("https://api.example.com/api/me/cards", () =>
        HttpResponse.json(response)
      )
    );

    // when
    render(MyCardPage);

    // then
    await waitFor(() => {
      response.cards.forEach((card) => {
        expect(screen.getByText(card.name)).toBeInTheDocument();

        const benefit = card.benefits[0];
        expect(screen.getAllByText(String(benefit.range.start)).length).toBeGreaterThan(1);
        expect(screen.getAllByText(String(benefit.range.end)).length).toBeGreaterThan(1);
        expect(screen.getAllByText(benefit.target).length).toBeGreaterThan(1);
        expect(screen.getAllByText(String(benefit.discount.amount)).length).toBeGreaterThan(1);
        expect(screen.getAllByText(benefit.discount.type).length).toBeGreaterThan(1);
        expect(screen.getAllByText(benefit.partner?.name ?? '').length).toBeGreaterThan(1);
      });
    });
  });
});