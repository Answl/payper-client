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
];
