import type { KakaoLoginRequest } from "@/types/KakaoLoginRequest";
import type { LoginResponse } from "@/types/LoginResponse";
import axios from "axios";

export const loginWithKakao = async (request: KakaoLoginRequest): Promise<LoginResponse> => {
  return (await axios.post<LoginResponse>("https://api.example.com/api/auth/login/kakao", request))
    .data;
};
