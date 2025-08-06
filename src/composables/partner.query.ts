import { getPartner, getPartners } from "@/api/partner.api";
import type { GetPartnersOptions } from "@/types/partner/GetPartnersOptions";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";

export const usePartnerQuery = (id: string | number) => {
  return useQuery({
    queryKey: ["partner", id],
    queryFn: () => getPartner(id),
    enabled: !!id,
  });
};

export const usePartnersQuery = (options: Ref<GetPartnersOptions>) => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: () => getPartners(options.value),
    enabled: false,
  });
};
