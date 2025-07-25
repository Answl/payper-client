import { baseURL } from "@/api/axios";
import type { KakaoLoginRequest } from "@/types/auth/KakaoLoginRequest";
import type { LoginResponse } from "@/types/auth/LoginResponse";
import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/cards", () => {
    return HttpResponse.json({
      cards: [
        //단일 카드 객체만 반환하던 것 배열 형태로 수정
        {
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
              range: {
                start: 0,
                end: 300000,
              },
              discount: {
                type: "RATE",
                amount: null,
                limitCount: 2,
                limitAmount: 1000,
              },
              category: {
                id: 1,
                name: "편의점",
              },
              partner: {
                id: 1,
                categoryId: 1,
                name: "GS25",
              },
            },
          ],
        },
        {
          id: 2,
          name: "토스뱅크 체크카드",
          company: {
            id: 2,
            name: "토스뱅크",
            code: 102,
          },
          benefits: [],
        },
      ],
    });
  }),

  http.get("https://api.example.com/api/users/me", () => {}),
  http.post<KakaoLoginRequest, never, LoginResponse>(baseURL + "/auth/login/kakao", () =>
    HttpResponse.json({
      accessToken: "mock-accessToken",
    })
  ),
  http.get(baseURL + "/cards/1/benefits/1", () => {
    return HttpResponse.json({
      id: 1,
      title: "GS25 할인",
      summary: "편의점에서 5% 할인",
      description: "매일 최대 2회, 1만원 한도 내 5% 할인 제공",
      iconUrl: "https://example.com/icon.png",
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
  }),
];
