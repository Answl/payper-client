import type { Benefit } from "./Benefit";
import type { CardCompany } from "./CardCompany";

export interface Card {
  id: number;
  name: string;
  benefits: Benefit[];
  company: CardCompany;
}
