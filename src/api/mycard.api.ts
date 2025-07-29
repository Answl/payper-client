import type { Cards } from "@/types/Cards";
import { api } from "./axios";


export const addToMyCards = async (cardId: number | string) => {
  await api.post("/me/cards", { cardId });
};

export const removeFromMyCards = async (cardId: number | string) => {
  await api.delete(`me/cards/${cardId}`);
};

export const getMyCards = async (): Promise<Cards> => {
  return (await api.get<Cards>("/cards/me")).data;
};
