import type { Partner } from "@/types/Partner";

export const mockPartners: Partner[] = [
  {
    id: 1,
    name: "GS25",
    myCards: [{
    id: 3,
    name: "우리동네 체크카드(키뮤)",
    type: "CHECK",
    imageUrl: "",
    company: {
      id: 1,
      name: "KB국민카드",
    },
    benefits: [
      {
        id: 4,
        title: "세탁소 업종 할인",
        summary: "1만원 이상 결제 시 10%",
        description: "<p>세탁소 업종 가맹점</p>",
        iconUrl: "https://example.com/laundry.png",
        limit: {
          limitCountPerDay: null,
          limitCountPerMonth: null,
          limitAmountPerPay: null,
        },
        categories: [{ id: 7, name: "생활" }],
        partners: [],
        benefitGrades: [],
      },
      {
        id: 5,
        title: "제과/아이스크림 할인",
        summary: "1만원 이상 결제 시 5%",
        description: "<p>제과·아이스크림 업종 가맹점</p>",
        iconUrl: "https://example.com/dessert.png",
        limit: {
          limitCountPerDay: null,
          limitCountPerMonth: null,
          limitAmountPerPay: null,
        },
        categories: [{ id: 8, name: "식비" }],
        partners: [],
        benefitGrades: [],
      },
    ],
    annualcosts: "5000원",
    grades: [],
  },],
    position: {
      x: 37.55033295359956,
      y: 127.07727277946327,
      distance: 200
    }
  },
  {
    id: 2,
    name: "CU",
    myCards: [],
    position: {
      x: 37.544832953599556,
      y: 127.07527277946327,
      distance: 300
    }
  },
  {
    id: 3,
    name: "세븐일레븐",
    myCards: [],
    position: {
      x: 37.54933295359956,
      y: 127.06827277946326,
      distance: 400
    }
  },
];
