import { HttpResponse, http } from "msw";
export const handlers = [
  http.get("https://api.example.com/api/cards", () => {
    return HttpResponse.json({
      id: 1,
      name: "KB누리2",
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
            rate: 10,
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
            category: 1,
            name: "GS25",
          },
        },
      ],
    });
  }),
];
