import type { Benefit } from "./Benefit";
import type { CardCompany } from "./CardCompany";
import type { Grade } from "./Grade";

export interface Card {
  id: number;
  name: string;
  type: "CREDIT" | "CHECK";
  imageUrl: string;
  cardIssueUrl: string;
  company: CardCompany;
  benefits: Benefit[];
  annualCost: string;
  grades: Grade[];
}
