import type { Range } from "./Range";
import type { Discount } from "./Discount";
import type { Category } from "./Category";
import type { Partner } from "./Partner";

export type Target = "PARTNER" | "CATEGORY";

export interface Benefit {
  id: number;
  target: Target;
  range: Range[];
  discount: Discount[];
  category: Category[];
  partner: Partner[];
}
