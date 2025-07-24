import type { User } from "@/types/User";
import { api } from "./axios";

export const getMe = async (): Promise<User> => {
  return (await api.get<User>("/users/me")).data;
};

export const deleteMe = async () => {
  await api.delete("/users/me");
};
