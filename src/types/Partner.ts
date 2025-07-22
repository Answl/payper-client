import { Category } from "./Category"

export interface Partner {
    id : number,
    categoryId : Category["id"],
    name : string
}