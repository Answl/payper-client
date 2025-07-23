import type { Category } from "./Category";

export interface Partner {
  id: number;
  category: Category["id"];
  name: string;
}
