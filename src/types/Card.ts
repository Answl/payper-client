import type { Benefit } from "./Benefit";

export interface Card {
  id: number;
  name: string;
  benefits: Benefit[];
}
