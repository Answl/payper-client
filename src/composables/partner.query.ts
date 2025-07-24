import { getPartner } from "@/api/partner.api";
import { useQuery } from "@tanstack/vue-query";

export const usePartnerQuery = (id: string | number) => {
  return useQuery({
    queryKey: ["partner", id],
    queryFn: () => getPartner(id),
    enabled: !!id,
  });
};
