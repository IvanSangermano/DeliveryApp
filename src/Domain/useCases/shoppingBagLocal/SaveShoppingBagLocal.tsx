import { ShoppingBagLocalRespositoryImpl } from "../../../Data/repositories/ShoppingBagLocalRepository";
import { Product } from '../../entities/Product';

const { save } = new ShoppingBagLocalRespositoryImpl()

export const SaveShoppingBagLocalUseCase = async (products: Product[]) => {
    return await save(products)
}

