import { getAllCards } from "@/api/card.api";
import { useQuery } from "@tanstack/vue-query";

export const useCardsQuery = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: getAllCards,
  });
};
