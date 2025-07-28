import type { Partner } from "@/types/Partner";
import { api } from "./axios";

export const getMAPartner = async (category: string, name: string, latitude: number, longitude: number): Promise<Partner> => {
  const response = await api.get<Partner>("https://api.example.com/api/partners", {
    params: {
      category,
      name,
      latitude,
      longitude,
    },
  });

  return response.data;
};
