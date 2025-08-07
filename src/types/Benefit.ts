import type { Category } from "./Category";

export interface Benefit {
  id: number;
  title: string;
  summary: string;
  description: string;
  iconUrl: string;
  categories: Category[];
}
