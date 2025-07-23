import type { Category } from "./Category";
import type { Partner } from "./Partner";

export interface Benefit {
  id: number;
  target: "CATEGORY" | "PARTNER";
  range: { start: number; end: number };
  discount: {
    type: "RATE" | "FIXED_AMOUNT";
    amount: number | null;
    limitCount: number | null;
    limitAmount: number | null;
  };
  category: Category;
  partner?: Partner | null;
}
