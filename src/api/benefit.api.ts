import type { Benefits } from "@/types/Benefits";
import type { Benefit } from "@/types/Benefit";
import { api } from "./axios";

export const getBenefits = async (cardId: string | number): Promise<Benefits> => {
  return (await api.get<Benefits>(`/cards/${cardId}/benefits`)).data;
};

export const getBenefit = async (cardId: string, benefitId: string): Promise<Benefit> => {
  return (await api.get<Benefit>(`/cards/${cardId}/benefits/${benefitId}`)).data;
};
