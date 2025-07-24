import type { Partner } from "@/types/Partner";
import { api } from "./axios";

export const getPartner = async (id: number | string): Promise<Partner> => {
  return (await api.get<Partner>(`https://api.example.com/api/partners/${id})`)).data;
};
