import type { Card } from "./Card";
import type { Position } from "./Positions";

export interface Partner {
  id: number;
  name: string;
  imageUrl: string;
  categoryName: string;
  position?: Position;
  myCards: Card[];
}
