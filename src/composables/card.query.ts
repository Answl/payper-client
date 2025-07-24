import { getAllCards, getCardById, searchCards } from "@/api/card.api";
import type { CardSearchOptions } from "@/types/card/CardSearchOptions";
import { useQuery } from "@tanstack/vue-query";

export const useCardQuery = (id: number) => {
  return useQuery({
    queryKey: ["card", id],
    queryFn: () => getCardById(id),
  });
};

export const useCardsQuery = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: getAllCards,
  });
};

export const useSearchCardsQuery = (options: CardSearchOptions) => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: () => searchCards(options),
  });
};
