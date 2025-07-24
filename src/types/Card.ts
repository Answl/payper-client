import type { AnnualCost } from "./AnnualCost";
import type { Benefit } from "./Benefit";
import type { CardCompany } from "./CardCompany";
import type { Grade } from "./Grade";

export interface Card {
  id: number; 
  name: string; 
  type: "CREDIT" | "CHECK"; 
  imageUrl: string; 
  company: CardCompany; 
  benefits: Benefit[]; 
  annualCosts: AnnualCost[]; 
  grades: Grade[]; 
}
