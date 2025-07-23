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
  company: {
    id: 1,
    name: "KB국민카드",
    code: 101,
  },
  benefits: [
    {
      id: 1,
      target: "PARTNER",
      range: { start: 0, end: 300000 },
      discount: {
        type: "RATE",
        amount: 10,
        limitCount: 2,
        limitAmount: 1000,
      },
      category: category,
      partner: {
        id: 1,
        category: category.id,
        name: "GS25",
      },
    },
  ],
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
