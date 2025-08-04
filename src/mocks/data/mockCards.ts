import type { Card } from "@/types/Card";
//import { mockCategory } from "./mockCategory";
import cardImg1 from "@/assets/cardimg/cardImg1.png";
import cardImg2 from "@/assets/cardimg/cardImg2.png";
import cardImg3 from "@/assets/cardimg/cardImg3.png";

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
        partners: [
          {
            id: 1,
            name: "GS25",
            myCards: [],
            position: {
              x: "127.0276368",
              y: "37.4979425",
              distance: 150, // 미터
              road_address_name: "서울 강남구 강남대로 396", // 도로명 주소
              place_url: "https://place.map.kakao.com/123456789", // 카카오맵 URL
              place_name: "GS25 강남대로점", // 전체 가맹점 이름
            },
            imageUrl: "",
            categoryName: "",
          },
        ],
        categories: [],
      },
    ],
    annualcosts: "1000원",
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

        categories: [
          {
            id: 2,
            name: "카페",
            imageUrl: "",
          },
        ],
        partners: [
          {
            id: 2,
            name: "스타벅스",
            myCards: [],
            position: {
              x: "127.029288",
              y: "37.499123",
              distance: 100,
              road_address_name: "서울특별시 강남구 테헤란로 152",
              place_url: "https://place.map.kakao.com/987654321",
              place_name: "스타벅스 테헤란로점",
            },
            imageUrl: "",
            categoryName: "",
          },
        ],

        benefitGrades: [],
      },
      {
        id: 3,
        title: "헬스/뷰티 할인",
        summary: "올리브영, 안경점 1천원 청구할인",
        description: "<p>올리브영, 안경점에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/oliveyoung.png",

        categories: [
          {
            id: 3,
            name: "헬스/뷰티",
            imageUrl: "",
          },
        ],
        partners: [
          {
            id: 3,
            name: "올리브영",
            myCards: [],
            position: {
              x: "127.030111",
              y: "37.500222",
              distance: 120,
              road_address_name: "서울특별시 강남구 역삼로 215",
              place_url: "https://place.map.kakao.com/567890123",
              place_name: "올리브영 강남역점",
            },
            imageUrl: "",
            categoryName: "",
          },
        ],
        benefitGrades: [],
      },
      {
        id: 4,
        title: "문화 할인",
        summary: "CGV 1천원 청구할인",
        description: "<p>CGV에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/cgv.png",

        categories: [
          {
            id: 4,
            name: "문화",
            imageUrl: "",
          },
        ],
        partners: [
          {
            id: 4,
            name: "CGV",
            myCards: [],
            position: {
              x: "127.025432",
              y: "37.501678",
              distance: 200,
              road_address_name: "서울특별시 강남구 강남대로 438",
              place_url: "https://place.map.kakao.com/345678901",
              place_name: "CGV 강남점",
            },
            imageUrl: "",
            categoryName: "",
          },
        ],
        benefitGrades: [],
      },
      {
        id: 5,
        title: "간편결제 온라인 할인",
        summary: "네이버페이 외 1천원 청구할인",
        description: "<p>네이버페이, 카카오페이, SSGPAY(온라인)에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/pay.png",

        categories: [
          {
            id: 5,
            name: "생활",
            imageUrl: "",
          },
        ],
        partners: [
          {
            id: 5,
            name: "네이버페이",
            myCards: [],
            position: {
              x: "127.031234",
              y: "37.502345",
              distance: 300,
              road_address_name: "경기도 성남시 분당구 불정로 6",
              place_url: "https://place.map.kakao.com/1122334455",
              place_name: "네이버 1784 빌딩",
            },
            imageUrl: "",
            categoryName: "",
          },
        ],
        benefitGrades: [],
      },
      {
        id: 6,
        title: "온라인 서점 할인",
        summary: "YES24 외 1천원 청구할인",
        description: "<p>YES24, 교보문고(온라인)에서 1천원 청구할인</p>",
        iconUrl: "https://example.com/book.png",

        categories: [
          {
            id: 6,
            name: "도서",
            imageUrl: "",
          },
        ],
        partners: [
          {
            id: 6,
            name: "YES24",
            myCards: [],
            position: {
              x: "127.033456",
              y: "37.503456",
              distance: 400,
              road_address_name: "서울특별시 강서구 마곡중앙로 161-8",
              place_url: "https://place.map.kakao.com/9988776655",
              place_name: "YES24 본사",
            },
            imageUrl: "",
            categoryName: "",
          },
        ],
        benefitGrades: [],
      },
    ],
    annualcosts: "2000원",
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

        categories: [
          {
            id: 7,
            name: "생활",
            imageUrl: "",
          },
        ],
        partners: [],
        benefitGrades: [],
      },
      {
        id: 5,
        title: "제과/아이스크림 할인",
        summary: "1만원 이상 결제 시 5%",
        description: "<p>제과·아이스크림 업종 가맹점</p>",
        iconUrl: "https://example.com/dessert.png",

        categories: [
          {
            id: 8,
            name: "식비",
            imageUrl: "",
          },
        ],
        partners: [],
        benefitGrades: [],
      },
    ],
    annualcosts: "3000원",
    grades: [],
  },
];

export const mockCards = { cards: cardList };
