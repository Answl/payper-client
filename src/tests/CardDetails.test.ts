import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import CardDetailsPage from "@/views/CardDetailsPage.vue";
import type { Category } from "@/types/Category";
import type { Card } from "@/types/Card";
import { createRouter, createWebHistory } from "vue-router";

const category: Category = {
  id: 1,
  name: "편의점",
};

const mockCard: Card = {
  id: 1,
  name: "KB노리2",
  type: "CREDIT",
  imageUrl: "https://example.com/card.png",
  company: {
    id: 1,
    name: "KB국민카드",
  },
  benefits: [
    {
      id: 1,
      title: "편의점 할인",
      summary: "GS25 10% 할인",
      description: "<p>월 2회, 최대 1천원</p>",
      iconUrl: "https://example.com/benefit.png",
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
            amount: 10,
            limitCount: null,
            limitAmount: null,
          },
        },
      ],
      categories: [category],
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
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/cards/:id",
      name: "CardDetail",
      component: CardDetailsPage,
    },
  ],
});

describe("CardDetailsPage.vue", () => {
  it("카드 상세 정보를 정상적으로 렌더링한다", async () => {
    //  given
    server.use(http.get("/api/cards/1", () => HttpResponse.json(mockCard)));

    //  when
    router.push("/cards/1");
    await router.isReady();

    render(CardDetailsPage, {
      global: {
        plugins: [router],
      },
    });

    // then
    await waitFor(() => {
      expect(screen.getByText("KB노리2")).toBeInTheDocument();
      expect(screen.getByText("KB국민카드")).toBeInTheDocument();
      expect(screen.getByText((t) => t.includes("편의점"))).toBeInTheDocument();
      expect(screen.getByText((t) => t.includes("GS25"))).toBeInTheDocument();
      expect(screen.getByText((t) => t.includes("10"))).toBeInTheDocument();
    });
  });
});
