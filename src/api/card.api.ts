import type { Cards } from "@/types/Cards";
import axios from "axios";

export const getAllCards = async (): Promise<Cards> => {
  return (await axios.get<Cards>("https://api.example.com/api/cards")).data;
};
