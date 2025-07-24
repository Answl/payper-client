import { deleteMe, getMe } from "@/api/user.api";
import { useMutation, useQuery } from "@tanstack/vue-query";

export const useMeQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    ...options,
  });
};

export const useDeleteMeMutation = (onSuccess?: () => void, onError?: (error: unknown) => void) => {
  return useMutation({
    mutationFn: deleteMe,
    onSuccess: () => {
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
