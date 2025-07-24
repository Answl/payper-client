export interface Discount {
    type: "RATE" | "FIXED_AMOUNT";
    amount: number;
    limitCount?: number | null;
    limitAmount?: number | null;
}