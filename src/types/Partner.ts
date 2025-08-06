import type { Card } from "./Card";
import type { Category } from "./Category";
import type { Position } from "./Positions";

export interface Partner {
  id: number;
  name: string;
  imageUrl: string;
  category: Category;
  position?: Position;
  myCards: Card[];
}
