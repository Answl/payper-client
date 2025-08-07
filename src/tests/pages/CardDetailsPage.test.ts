import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import { createRouter, createWebHistory } from "vue-router";
import CardDetailsPage from "@/pages/CardDetailsPage.vue";
import { mockCard } from "@/mocks/data/mockCard";
import { baseURL } from "@/api/axios";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

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

const queryClient = new QueryClient();

describe("CardDetailsPage.vue", () => {
  it("카드 상세 정보를 정상적으로 렌더링한다", async () => {
    //  given
    server.use(http.get(baseURL + "/cards/1", () => HttpResponse.json(mockCard)));

    //  when
    router.push("/cards/1");
    await router.isReady();

    render(CardDetailsPage, {
      global: {
        plugins: [router, [VueQueryPlugin, { queryClient }]],
      },
    });

    // then
    await waitFor(() => {
      expect(screen.getByText(mockCard.name)).toBeInTheDocument();
      expect(screen.getByText(mockCard.company.name)).toBeInTheDocument();
      // mockCard.benefits.forEach((benefit) => {
      //   expect(screen.getAllByText(benefit.title).length).toBeGreaterThan(0);
      // });
      if (mockCard.benefits) {
        mockCard.benefits.forEach((benefit) => {
          expect(screen.getAllByText(benefit.title).length).toBeGreaterThan(0);
        });
      }
    });
  });
});
