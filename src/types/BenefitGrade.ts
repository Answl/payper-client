import type { Grade } from "./Grade";

export interface BenefitGrade {
  id: number;
  grade: Grade;
  type: "RATE" | "FIXED_AMOUNT" | "UNKNOWN";
  amount: number;
  limitCount?: number | null;
  limitAmount?: number | null;
  minPayment?: number | null;
}
