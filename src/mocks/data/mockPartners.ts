import type { Partner } from "@/types/Partner";
import { mockCategory } from "./mockCategory";

export const mockPartners: Partner[] = [
  {
    id: 1,
    name: "GS25",
    myCards: [
      {
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
            categories: [],
          },
          {
            id: 5,
            title: "제과/아이스크림 할인",
            summary: "1만원 이상 결제 시 5%",
            description: "<p>제과·아이스크림 업종 가맹점</p>",
            iconUrl: "https://example.com/dessert.png",
            categories: [],
          },
        ],
        annualCost: "5000원",
        cardIssueUrl: "",
        prevMonthSpending: 1000,
      },
    ],
    position: {
      x: "127.07727277946327",
      y: "37.55033295359956",
      distance: 200,
      roadAddressName: "서울특별시 광진구 능동로 120",
      placeUrl: "https://place.map.kakao.com/123456789",
      placeName: "GS25 어린이대공원역점",
    },
    imageUrl: "",
    category: mockCategory,
  },
  {
    id: 2,
    name: "CU",
    myCards: [],
    position: {
      x: "127.07527277946327",
      y: "37.544832953599556",
      distance: 300,
      roadAddressName: "서울특별시 광진구 자양로 117",
      placeUrl: "https://place.map.kakao.com/234567890",
      placeName: "CU 자양점",
    },
    imageUrl: "",
    category: mockCategory,
  },
  {
    id: 3,
    name: "세븐일레븐",
    myCards: [],
    position: {
      x: "127.06827277946326",
      y: "37.54933295359956",
      distance: 400,
      roadAddressName: "서울특별시 광진구 구의강변로 80",
      placeUrl: "https://place.map.kakao.com/345678901",
      placeName: "세븐일레븐 구의점",
    },
    imageUrl: "",
    category: mockCategory,
  },
];
