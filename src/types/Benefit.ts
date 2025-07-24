import type { Category } from "./Category";
import type { Partner } from "./Partner";
import type { BenefitGrade } from "./BenefitGrade";
import type { Limit } from "./Limit";

export interface Benefit {
  id: number;
  title: string;
  summary: string;
  description: string;
  iconUrl: string;
  limit: Limit;
  benefitGrades: BenefitGrade[];
  categories: Category[];
  partners: Partner[];
  minPayment: number;
}
