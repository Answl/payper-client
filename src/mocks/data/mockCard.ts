import type { Card } from "@/types/Card";
import { mockCardCompany } from "./mockCardCompany";
import { mockBenefits } from "./mockBenefits";

export const mockCard: Card = {
  id: 1,
  name: "KB노리2",
  type: "CREDIT",
  imageUrl: "https://cdn.banksalad.com/resources/images/cards/kb_nori2_basic_check.png",
  company: mockCardCompany,
  benefits: mockBenefits,
  annualCosts: [
    {
      brandName: "S&",
      amount: 10000,
    },
    {
      brandName: "VISA",
      amount: 5000,
    },
  ],
  grades: [],
};
