import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/vue";
import BenefitDetailsPage from "@/pages/BenefitDetailsPage.vue";
import { flushPromises } from "@vue/test-utils";

const { getBenefitMock, useRouteMock } = vi.hoisted(() => ({
  getBenefitMock: vi.fn(),
  useRouteMock: vi.fn(),
}));

vi.mock("@/api/benefit.api", () => ({
  getBenefit: getBenefitMock,
}));

vi.mock("vue-router", async () => {
  const actual = await vi.importActual<typeof import("vue-router")>("vue-router");
  return {
    ...actual,
    useRoute: useRouteMock,
  };
});

describe("BenefitDetailsPage.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useRouteMock.mockReturnValue({
      params: { cardId: 1, benefitId: 1 },
    });
  });

  it("정상적으로 혜택 상세 데이터를 출력한다", async () => {
    getBenefitMock.mockResolvedValue({
      id: 1,
      title: "GS25 할인",
      summary: "편의점에서 5% 할인",
      description: "매일 최대 2회, 1만원 한도 내 5% 할인 제공",
      iconUrl: "",
      limit: {
        limitCountPerDay: 2,
        limitCountPerMonth: 30,
        limitCountPerYear: null,
        limitAmountPerPay: null,
      },
      benefitGrades: [],
      categories: [],
      partners: [],
      minPayment: 10000,
    });

    render(BenefitDetailsPage);

    await waitFor(() => {
      expect(screen.getByText("GS25 할인")).toBeInTheDocument();
      expect(screen.getByText("편의점에서 5% 할인")).toBeInTheDocument();
      expect(screen.getByText("일일 제한: 2")).toBeInTheDocument();
    });
  });
  it("API 에러 발생 시 메시지 출력", async () => {
    getBenefitMock.mockRejectedValue(new Error("API 실패"));
    render(BenefitDetailsPage);
    await flushPromises();

    await waitFor(() => {
      expect(screen.getByText(/혜택 정보를 불러올 수 없습니다/)).toBeInTheDocument();
    });
  });
});
