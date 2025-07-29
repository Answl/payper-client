import type { Card } from "@/types/Card";
import { mockCategory } from "./mockCategory";

export const mockCards: Card[] = [
  {
    id: 1,
    name: "KB노리2",
    type: "CREDIT",
    imageUrl: "https://example.com/card.png",
    company: {
      id: 1,
      name: "KB국민카드",
    },
    benefits: [
      {
        id: 1,
        title: "편의점 할인",
        summary: "GS25 10% 할인",
        description: "<p>월 2회, 최대 1천원</p>",
        iconUrl: "https://example.com/benefit.png",
        limit: {
          limitCountPerDay: null,
          limitCountPerMonth: 2,
          limitAmountPerPay: 1000,
        },
        benefitGrades: [
          {
            id: 1,
            grade: {
              id: 1,
              start: 0,
              end: 300000,
              totalDiscount: 2000,
            },
            discount: {
              type: "RATE",
              amount: 10,
              limitCount: null,
              limitAmount: null,
            },
          },
        ],
        categories: [mockCategory],
        partners: [
          {
            id: 1,
            name: "GS25",
            myCards: [],
            position: {
              x: 0,
              y: 0,
              distance: 0,
            },
          },
        ],
        minPayment: 1000,
      },
    ],
    annualCosts: [],
    grades: [],
  },
];
