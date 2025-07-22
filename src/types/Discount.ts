export type Type = "RATE" | "FIXED_AMOUNT";

// export enum Type {
//   RATE = "RATE",
//   FIXED_AMOUNT = "FIXED_AMOUNT",
// }

export interface Discount {
  type: Type;
  amount: number;
  limitCount?: number;
  limitAmount?: number;
}
