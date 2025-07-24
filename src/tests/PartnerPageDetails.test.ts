import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises } from "@vue/test-utils";
import PartnerDetailsPage from "@/pages/PartnerDetailsPage.vue"; // 가정된 경로
import { useRoute } from "vue-router";
import type { Partner } from "@/types/Partner";
import { screen, render, waitFor } from "@testing-library/vue";

const { getPartnerMock } = vi.hoisted(() => ({
  getPartnerMock: vi.fn(),
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
    useRoute: vi.fn(),
  };
});

const userRouteMock = useRoute as unknown as ReturnType<typeof vi.fn>;

describe("PartnerDetailsPage", () => {
  const partnerMock: Partner = {
    id: 1,
    name: "테스트 파트너",
    category: {
      id: 2,
      name: "카테고리명",
    },
  };

  beforeEach(() => {
    userRouteMock.mockClear();
    // useRoute를 통해 partnerId = 1로 고정
    userRouteMock.mockReturnValue({
      params: { id: 1 },
    });
    //getPartnerMock.mockClear();
    vi.clearAllMocks();
  });

  // 테스트 1: 기본 렌더링 요소가 존재하는지 확인
  it("should render base structure", async () => {
    //given

    //when
    await render(PartnerDetailsPage);

    //then
    await waitFor(() => {
      expect(screen.getByTestId("partnerNameTest")).toBeInTheDocument();
    });
  });

  // 테스트 2: getPartner 호출 시 에러 발생 → error 메시지 노출
  it("should show error message when getPartner throws error", async () => {
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

  // 테스트 3: getPartner 함수가 호출되고 올바른 Partner 객체를 반환했는지 확인
  it("should call getPartner and set correct data", async () => {
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
});
