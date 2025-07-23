import type { Card } from "@/types/Card";
import type { Cards } from "@/types/Cards";
import axios from "axios";

export const getAllCards = async (): Promise<Cards> => {
  return (await axios.get<Cards>("https://api.example.com/api/cards")).data;
};

// 단일 카드 상세 조회
export const getCardById = async (id: number): Promise<Card> => {
  return (await axios.get<Card>(`/api/cards/${id}`)).data;
};
