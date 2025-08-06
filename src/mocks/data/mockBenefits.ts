import type { Benefit } from "@/types/Benefit";
import { mockCategories } from "./mockCategories";
import { mockGrades } from "./mockGrades";

export const mockBenefits: Benefit[] = [
  {
    id: 24872,
    title: "편의점",
    summary: "편의점 5% 할인",
    description:
      '<ul><li>일 1회, 월 5회, 건당 1만원 까지 할인 적용</li></ul><p>※ 상기 서비스는 통합할인한도 범위내에서 제공이 됩니다.<br>※ 이용 거래건의 할인순서는 카드사의 전표매입순서 기준으로 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[통합 할인 서비스 통합 할인한도]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원</th><th style="text-align:center;">50~100만원</th><th style="text-align:center;">100~150만원</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td><td style="text-align:center;">2만원</td></tr></tbody></table></figure><p>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 5천원의 통합 할인한도가 제공됩니다.</p>',
    iconUrl: "https://financialshopping-cdn.banksalad.com/convenience_store_circle_5592955e1c.png",

    benefitGrades: [
      {
        id: 0,
        grade: mockGrades[0],
        type: "FIXED_AMOUNT",
        amount: 5000,
        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[1],

        type: "FIXED_AMOUNT",
        amount: 12000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[2],

        type: "FIXED_AMOUNT",
        amount: 15000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[3],

        type: "FIXED_AMOUNT",
        amount: 20000,

        minPayment: 5000,
      },
    ],
    categories: mockCategories,
  },
  {
    id: 24873,
    title: "커피",
    summary: "커피전문점(스타벅스, 커피빈, 카페베네, 엔제리너스 매장) 10% 할인",
    description:
      '<ul><li>일 1회, 월 8회, 건당 1만원까지 할인 적용&nbsp;</li></ul><p>※ 상기 서비스는 통합할인한도 범위내에서 제공이 됩니다.<br>※ 백화점, 할인점, 면세점 등 일부 쇼핑몰 내 입점 된 커피전문점에서는 적용되지 않을 수 있습니다.<br>※ 이용 거래건의 할인순서는 카드사의 전표매입순서 기준으로 할인 적용됩니다.</p><p>&nbsp;</p><p><strong>[통합 할인 서비스 통합 할인한도]</strong></p><figure class="table"><table><thead><tr><th style="text-align:center;">전월 이용금액</th><th style="text-align:center;">30~50만원</th><th style="text-align:center;">50~100만원</th><th style="text-align:center;">100~150만원</th><th style="text-align:center;">150만원 이상</th></tr></thead><tbody><tr><td style="text-align:center;">할인한도</td><td style="text-align:center;">5천원</td><td style="text-align:center;">1만 2천원</td><td style="text-align:center;">1만 5천원</td><td style="text-align:center;">2만원</td></tr></tbody></table></figure><p>※ 신규 발급 회원에 대해서는 카드사용 등록월의 익월말(등록월+1개월)까지 5천원의 통합 할인한도가 제공됩니다.</p>',
    iconUrl: "https://financialshopping-cdn.banksalad.com/coffee_takeout_cup_circle_cfb51018ed.png",

    benefitGrades: [
      {
        id: 0,
        grade: mockGrades[0],

        type: "FIXED_AMOUNT",
        amount: 5000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[1],

        type: "FIXED_AMOUNT",
        amount: 12000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[2],

        type: "FIXED_AMOUNT",
        amount: 15000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[3],

        type: "FIXED_AMOUNT",
        amount: 20000,

        minPayment: 5000,
      },
    ],
    categories: mockCategories,
  },
  {
    id: 24874,
    title: "CGV, 메가박스 온라인 영화 예매",
    summary: "CGV, 메가박스 온라인 영화 예매 최대 1만 2천원 할인",
    description:
      "<ul><li>최대 3천원 결제일 할인(9천원 이상일 경우 1,500원 할인, 1만 8천원 이상일 경우 3천원 할인)</li><li>제공기준 : 통합 1일 2회, 월 4회, 연 12회 제공</li></ul><p>※ 온라인 영화 할인 서비스의 경우 공식 홈페이지 및 APP을 통해 예매 시 제공됩니다.</p><p>&nbsp;</p><p>※ 서비스 이용 전월 해당 카드로 일시불 + 할부 이용 금액이 30만원 이상인 경우 서비스가 제공이 됩니다.</p><p>※ 신규 발급 회원에 대해서는 카드사용 등록 월의 익월 말(등록 월 + 1개월)까지 전월 이용 금액 기준과 무관하게 할인 서비스가 제공됩니다.</p>",
    iconUrl: "https://financialshopping-cdn.banksalad.com/film_reel_circle_12f75640fa.png",

    benefitGrades: [
      {
        id: 0,
        grade: mockGrades[0],

        type: "FIXED_AMOUNT",
        amount: 12000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[1],

        type: "FIXED_AMOUNT",
        amount: 12000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[2],

        type: "FIXED_AMOUNT",
        amount: 12000,

        minPayment: 5000,
      },
      {
        id: 1,
        grade: mockGrades[3],

        type: "FIXED_AMOUNT",
        amount: 12000,

        minPayment: 5000,
      },
    ],
    categories: mockCategories,
  },
];
