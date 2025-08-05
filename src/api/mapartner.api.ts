import type { Partners } from "@/types/Partners";
import { api } from "./axios";

export const getMAPartner = async ( query: string, y: number, x: number): Promise<Partners> => {
  const response = await api.get<Partners>("/partners", {
    params: {
      x,
      y,
      query
    },
  });

  return response.data;
};
