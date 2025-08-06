import type { Partner } from "@/types/Partner";
import { mockBenefit } from "./mockBenefit";

export const mockPartner: Partner = {
  id: 0,
  name: "GS25",
  myCards: [
    {
      id: 0,
      name: "토심이 첵첵 체크카드",
      type: "CREDIT",
      imageUrl: "https://financialshopping-cdn.banksalad.com/kb_rabbit_checkcheck_c180bfe901.png",
      company: {
        id: 0,
        name: "KB국민카드",
      },
      benefits: [mockBenefit],
      annualCost: "4000원",
      grades: [
        {
          id: 0,
          start: 300000,
          totalDiscount: 1000,
        },
        {
          id: 1,
          start: 500000,
          totalDiscount: 2000,
        },
      ],
      cardIssueUrl: "",
    },
  ],
  imageUrl: "",
  category: {
    id: 0,
    name: "편의점",
    imageUrl:
      "https://payper-bucket.s3.ap-northeast-2.amazonaws.com/CONVENIENCE_STORE_MARKER_IMAGE.png",
  },
};
