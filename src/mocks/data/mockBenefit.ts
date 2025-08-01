import type { Benefit } from "@/types/Benefit";
import { mockCategories } from "./mockCategories";
import { mockPartners } from "./mockPartners";

export const mockBenefit: Benefit = {
  id: 24871,
  title: "편의점",
  summary: "편의점 5% 할인",
  description:
    '<ul><li>일 1회, 월 5회, 건당 1만원 까지 할인 적용</li></ul><p>※ 상기 서비스는 통합할인한도 범위내에서 제공이 됩니다.<br>※ 이용 거래건의 할인순서는 카드사의 전표매입순서 기준으로 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[통합 할인 서비스 통합 할인한도]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원</th><th style="text-align:center;">50~100만원</th><th style="text-align:center;">100~150만원</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td><td style="text-align:center;">2만원</td></tr></tbody></table></figure><p>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 5천원의 통합 할인한도가 제공됩니다.</p>',
  iconUrl: "https://financialshopping-cdn.banksalad.com/convenience_store_circle_5592955e1c.png",

  benefitGrades: [],
  categories: mockCategories,
  partners: mockPartners,
};
