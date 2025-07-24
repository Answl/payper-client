import { getBenefits } from "@/api/benefit.api";
import { useQuery } from "@tanstack/vue-query";

export const useCardBenefitsQuery = (cardId: string | number) => {
  return useQuery({
    queryKey: ["benefits", cardId],
    queryFn: () => getBenefits(cardId),
    enabled: !!cardId,
  });
};
