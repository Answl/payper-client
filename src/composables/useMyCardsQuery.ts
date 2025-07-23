import { getMyCards } from "@/api/mycard.api";
import { useQuery } from "@tanstack/vue-query";

export const useMyCardsQuery = () => {
  return useQuery({
    queryKey: ["my-cards"],
    queryFn: getMyCards,
  });
};
