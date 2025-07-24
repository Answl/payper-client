import { useMutation } from "@tanstack/vue-query";
import { loginWithKakao, logout } from "@/api/auth.api";
import type { KakaoLoginRequest } from "@/types/auth/KakaoLoginRequest";
import type { LoginResponse } from "@/types/auth/LoginResponse";

export const useKakaoLoginMutation = (options?: {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: (request: KakaoLoginRequest) => loginWithKakao(request),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};

export const useLogoutMutation = (options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
