import type { Card } from "@/types/Card";
//import { mockCategory } from "./mockCategory";
import cardImg1 from "@/assets/cardimg/cardImg1.png";
import cardImg2 from "@/assets/cardimg/cardImg2.png";
import cardImg3 from "@/assets/cardimg/cardImg3.png"


const cardList: Card[] = [
  {
    id: 1,
    name: "KB노리2",
    type: "CREDIT",
    imageUrl: cardImg1,
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
            minPayment: 1000,
          },
        ],
        categories: [{ id: 1, name: "편의점" }],
        partners: [
          {
            id: 1,
            name: "GS25",
            myCards: [],
            position: { x: 0, y: 0, distance: 0 },
          },
        ],
      },
    ],
    annualCosts: [],
    grades: [],
  },
  {
    id: 2,
    name: "토심이 체크카드",
    type: "CHECK",
    imageUrl: cardImg2,
    company: {
      id: 1,
      name: "KB국민카드",
    },
    benefits: [
      {
        id: 2,
        title: "커피 할인",
        summary: "스타벅스 등 1천원 청구할인",
        description: "<p>스타벅스, 스타벅스 APP 사이렌오더에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/starbucks.png",
        limit: {
          limitCountPerDay: 1,
          limitCountPerMonth: 10,
          limitAmountPerPay: 1000,
        },
        categories: [{ id: 2, name: "카페" }],
        partners: [
          { id: 2, name: "스타벅스", myCards: [], position: { x: 0, y: 0, distance: 0 } },
        ],
        benefitGrades: [],
      },
      {
        id: 3,
        title: "헬스/뷰티 할인",
        summary: "올리브영, 안경점 1천원 청구할인",
        description: "<p>올리브영, 안경점에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/oliveyoung.png",
        limit: {
          limitCountPerDay: 1,
          limitCountPerMonth: 5,
          limitAmountPerPay: 1000,
        },
        categories: [{ id: 3, name: "헬스/뷰티" }],
        partners: [
          { id: 3, name: "올리브영", myCards: [], position: { x: 0, y: 0, distance: 0 } },
        ],
        benefitGrades: [],
      },
      {
        id: 4,
        title: "문화 할인",
        summary: "CGV 1천원 청구할인",
        description: "<p>CGV에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/cgv.png",
        limit: {
          limitCountPerDay: 1,
          limitCountPerMonth: 5,
          limitAmountPerPay: 1000,
        },
        categories: [{ id: 4, name: "문화" }],
        partners: [
          { id: 4, name: "CGV", myCards: [], position: { x: 0, y: 0, distance: 0 } },
        ],
        benefitGrades: [],
      },
      {
        id: 5,
        title: "간편결제 온라인 할인",
        summary: "네이버페이 외 1천원 청구할인",
        description: "<p>네이버페이, 카카오페이, SSGPAY(온라인)에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/pay.png",
        limit: {
          limitCountPerDay: 1,
          limitCountPerMonth: 5,
          limitAmountPerPay: 1000,
        },
        categories: [{ id: 5, name: "생활" }],
        partners: [
          { id: 5, name: "네이버페이", myCards: [], position: { x: 0, y: 0, distance: 0 } },
        ],
        benefitGrades: [],
      },
      {
        id: 6,
        title: "온라인 서점 할인",
        summary: "YES24 외 1천원 청구할인",
        description: "<p>YES24, 교보문고(온라인)에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/book.png",
        limit: {
          limitCountPerDay: 1,
          limitCountPerMonth: 5,
          limitAmountPerPay: 1000,
        },
        categories: [{ id: 6, name: "도서" }],
        partners: [
          { id: 6, name: "YES24", myCards: [], position: { x: 0, y: 0, distance: 0 } },
        ],
        benefitGrades: [],
      },
    ],
    annualCosts: [],
    grades: [],
  },
  {
    id: 3,
    name: "우리동네 체크카드(키뮤)",
    type: "CHECK",
    imageUrl: cardImg3,
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
    annualCosts: [],
    grades: [],
  },
];

export const mockCards = { cards: cardList };
