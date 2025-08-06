import type { Partner } from "@/types/Partner";
import { api } from "./axios";
import type { Partners } from "@/types/Partners";
import type { GetPartnersOptions } from "@/types/partner/GetPartnersOptions";

export const getPartner = async (id: number | string): Promise<Partner> => {
  return (await api.get<Partner>(`/partners/${id})`)).data;
};

export const getPartners = async (options: GetPartnersOptions): Promise<Partners> => {
  return (await api.get<Partners>(`/partners`, { params: options })).data;
};
