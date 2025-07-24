import type { Card } from "./Card";

export interface Partner {
  id: number;
  name: string;
  myCards : Card[];
}
