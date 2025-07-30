import type { Partners } from "@/types/Partners";
import { api } from "./axios";

export const getMAPartner = async ( name: string, latitude: number, longitude: number): Promise<Partners> => {
  const response = await api.get<Partners>("/partners", {
    params: {
      name,
      latitude,
      longitude,
    },
  });

  return response.data;
};
