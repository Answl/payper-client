import type { Benefits } from "@/types/Benefits";
import { api } from "./axios";

export const getBenefits = async (cardId: string | number): Promise<Benefits> => {
  return (await api.get<Benefits>(`/cards/${cardId}/benefits`)).data;
};
