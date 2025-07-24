import type { KakaoLoginRequest } from "@/types/auth/KakaoLoginRequest";
import type { LoginResponse } from "@/types/auth/LoginResponse";
import { api } from "./axios";
import type { NewTokensResponse } from "@/types/auth/NewTokensResponse";

export const loginWithKakao = async (request: KakaoLoginRequest): Promise<LoginResponse> => {
  return (await api.post<LoginResponse>("/auth/login/kakao", request)).data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getNewTokens = async (): Promise<NewTokensResponse> => {
  return (await api.get<NewTokensResponse>("/auth/tokens")).data;
};
