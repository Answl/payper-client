import type { Card } from "@/types/Card";
import type { Cards } from "@/types/Cards";
import { api } from "./axios";
import type { CardSearchOptions } from "@/types/card/CardSearchOptions";

export const getAllCards = async (): Promise<Cards> => {
  return (await api.get<Cards>("/cards")).data;
};

// 단일 카드 상세 조회
export const getCardById = async (id: number): Promise<Card> => {
  return (await api.get<Card>(`/cards/${id}`)).data;
};

export const searchCards = async (options: CardSearchOptions) => {
  return (await api.get<Cards>("/cards/search", { params: options })).data;
};
