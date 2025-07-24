import type { Partner } from "@/types/Partner";
import axios from "axios";

export const getPartner = async (id: number | string): Promise<Partner> => {
  return (await axios.get<Partner>(`https://api.example.com/api/partners/${id})`)).data;
};
