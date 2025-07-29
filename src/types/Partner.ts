import type { Card } from "./Card";
import type {Position} from "./Positions";

export interface Partner {
  id: number;
  name: string;
  myCards : Card[];
  position ?: Position,
}
