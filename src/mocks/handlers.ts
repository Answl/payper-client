import { baseURL } from "@/api/axios";
import { HttpResponse, http } from "msw";
import { mockBenefits } from "./data/mockBenefits";
import { mockCards } from "./data/mockCards";
import { mockCard } from "./data/mockCard";
import { mockUser } from "./data/mockUser";
import { mockPartners } from "./data/mockPartners";
import { mockTokens } from "./data/mockTokens";
import { mockPartner } from "./data/mockPartner";

export const handlers = [
  // API-6 카드 혜택 조회
  http.get(baseURL + "/cards/:cardId/benefits", () => HttpResponse.json(mockBenefits)),
  // API-22 내 카드 조회
  http.get(baseURL + "/cards/me", () => HttpResponse.json(mockCards)),
  // API-15 내 카드에 등록
  http.post(baseURL + "/cards/me", () => HttpResponse.json({})),
  // API-37 내 카드에서 삭제
  http.delete(baseURL + "/cards/me/:cardId", () => HttpResponse.json({})),
  // API-16 시중 카드 조회
  http.get(baseURL + "/cards/:cardId", () => HttpResponse.json(mockCard)),
  // API-10 시중 카드 검색
  http.get(baseURL + "/cards/search", () => HttpResponse.json(mockCards)),
  // API-24 회원 조회
  http.get(baseURL + "/users/me", () => HttpResponse.json(mockUser)),
  // API-3 회원 탈퇴
  http.delete(baseURL + "/users/me", () => HttpResponse.json({})),
  // API-28 파트너 리스트 조회
  http.get(baseURL + "/partners", () => HttpResponse.json(mockPartners)),
  // 파트너 상세 조회
  http.get(baseURL + "/partners/:id", () => HttpResponse.json(mockPartner)),
  // API-18 카카오 회원가입
  http.post(baseURL + "/auth/login/kakao", () => HttpResponse.json({})),
  // API-23 로그아웃
  http.post(baseURL + "/auth/logout", () => HttpResponse.json({})),
  // API-25 토큰 재발급
  http.get(baseURL + "/auth/tokens", () => HttpResponse.json(mockTokens)),
];
