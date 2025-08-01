import type { Discount } from "./Discount";
import type { Grade } from "./Grade";

export interface BenefitGrade {
  id: number;
  grade: Grade;
  discount: Discount;
  minPayment: number;
}
