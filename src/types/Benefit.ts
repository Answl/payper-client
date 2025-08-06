import type { Category } from "./Category";
import type { BenefitGrade } from "./BenefitGrade";

export interface Benefit {
  id: number;
  title: string;
  summary: string;
  description: string;
  iconUrl: string;
  benefitGrades: BenefitGrade[];
  categories: Category[];
}
