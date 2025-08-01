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
  annualcosts: "10000원",
  grades: mockGrades,
};
