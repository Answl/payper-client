import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import { createRouter, createWebHistory } from "vue-router";
import CardDetailsPage from "@/pages/CardDetailsPage.vue";
import { mockCard } from "@/mocks/data/mockCard";
import { baseURL } from "@/api/axios";

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
    server.use(http.get(baseURL + "/cards/1", () => HttpResponse.json(mockCard)));

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
