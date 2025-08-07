import type { Benefit } from "./Benefit";
import type { CardCompany } from "./CardCompany";

export interface Card {
  id: number;
  name: string;
  type: "CREDIT" | "CHECK";
  imageUrl: string;
  cardIssueUrl: string | null;
  company: CardCompany;
  benefits: Benefit[] | null;
  annualCost: string | null;
  preMonthSpending: string;
}
