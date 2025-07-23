import type { User } from "@/types/User";
import axios from "axios";

export const getMe = async (): Promise<User> => {
  return (await axios.get<User>("https://api.example.com/api/users/me")).data;
};
