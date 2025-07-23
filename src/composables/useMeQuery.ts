import { getMe } from "@/api/user.api";
import { useQuery } from "@tanstack/vue-query";

export const useMeQuery = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    ...options,
  });
};
