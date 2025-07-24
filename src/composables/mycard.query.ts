import { addToMyCards, getMyCards, removeFromMyCards } from "@/api/mycard.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export const useMyCardsQuery = () => {
  return useQuery({
    queryKey: ["my-cards"],
    queryFn: getMyCards,
  });
};

// 내 카드에 추가
// 내 카드 목록 쿼리를 invalidate 합니다.
export const useAddToMyCardsMutation = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number | string) => addToMyCards(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cards"] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};

export const useRemoveFromMyCardsMutation = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number | string) => removeFromMyCards(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-cards"] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
