import type { Cards } from '@/types/Cards'
import axios from 'axios'

export const getMyCards = async () : Promise<Cards> => {
  return (await axios.get<Cards>('https://api.example.com/api/me/cards')).data
}