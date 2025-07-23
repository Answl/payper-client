import { getCardById } from "@/api/card.api";
import { useQuery } from "@tanstack/vue-query";

export const useCardQuery = (id: number) => {
  return useQuery({
    queryKey: ["card", id],
    queryFn: () => getCardById(id),
  });
};
