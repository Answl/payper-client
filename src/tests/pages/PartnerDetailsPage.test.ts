import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises } from "@vue/test-utils";
import PartnerDetailsPage from "@/pages/PartnerDetailsPage.vue"; // 가정된 경로
import type { Partner } from "@/types/Partner";
import { screen, render, waitFor } from "@testing-library/vue";

const { getPartnerMock, useRouteMock } = vi.hoisted(() => ({
  getPartnerMock: vi.fn(),
  useRouteMock: vi.fn(),
}));

// getPartner 함수와 vue-router 모킹
vi.mock("@/api/partner.api", async () => {
  return {
    getPartner: getPartnerMock,
  };
});
vi.mock("vue-router", async () => {
  const actual = await vi.importActual<typeof import("vue-router")>("vue-router");

  return {
    ...actual,
    useRoute: useRouteMock,
  };
});

describe("PartnerDetailsPage", () => {
  const partnerMock: Partner = {
    id: 1,
    name: "테스트 파트너",
    myCards: [
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
    ],
  };

  beforeEach(() => {
    useRouteMock.mockClear();
    // useRoute를 통해 partnerId = 1로 고정
    useRouteMock.mockReturnValue({
      params: { id: 1 },
    });
    //getPartnerMock.mockClear();
    vi.clearAllMocks();
  });

  it("기본 렌더링 요소가 존재하는지 확인", async () => {
    //given

    //when
    await render(PartnerDetailsPage);

    //then
    await waitFor(() => {
      expect(screen.getByTestId("partnerNameTest")).toBeInTheDocument();
    });
  });

  it("getPartner 호출 시 에러 발생 → error 메시지 노출", async () => {
    //given
    getPartnerMock.mockRejectedValue(new Error("API error"));

    //when
    await flushPromises();
    await render(PartnerDetailsPage);

    //then
    await waitFor(() => {
      expect(screen.getByText("not enrolled partner")).toBeInTheDocument();
      //console.log(screen.getByText("not enrolled partner").textContent);
    });
  });

  it("getPartner 함수가 호출되고 올바른 Partner 객체를 반환했는지 확인", async () => {
    //given
    getPartnerMock.mockResolvedValue(partnerMock);

    //when
    await flushPromises();
    render(PartnerDetailsPage);

    //then
    await waitFor(() => {
      expect(getPartnerMock).toHaveBeenCalledOnce();
      expect(screen.getByTestId("partnerNameTest")).toBeInTheDocument();
      expect(screen.getByTestId("partnerNameTest")).toHaveTextContent("테스트 파트너");
    });
  });

  it("partnerdml Cards가 화면에 출력되는지 확인", async () => {
    //given
    getPartnerMock.mockResolvedValue(partnerMock);

    //when
    render(PartnerDetailsPage);

    //then
    await waitFor(() => {
      expect(screen.getByText("KB노리2")).toBeInTheDocument();
      expect(screen.getByText("토스뱅크 체크카드")).toBeInTheDocument();
    });
  })
});
