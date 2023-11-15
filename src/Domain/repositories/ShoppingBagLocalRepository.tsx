import { Product } from "../entities/Product";

export interface ShoppingBagLocalRespository {
    save(products: Product[]): Promise<void>
    getShoppingBag(): Promise<Product[]>
}