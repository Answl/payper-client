import type { Card } from "@/types/Card";
import { mockCardCompany } from "./mockCardCompany";
import { mockBenefits } from "./mockBenefits";
import { mockGrades } from "./mockGrades";

export const mockCard: Card = {
  id: 1,
  name: "신한카드 B.Big(삑)",
  type: "CREDIT",
  imageUrl: "https://financialshopping-cdn.banksalad.com/shihan_b_big_5acbb579eb.png",
  company: mockCardCompany,
  benefits: mockBenefits,
  annualCosts: [
    {
      brandName: "S&",
      amount: 10000,
    },
    {
      brandName: "UPI",
      amount: 10000,
    },
    {
      brandName: "VISA",
      amount: 13000,
    },
  ],
  grades: mockGrades,
};
