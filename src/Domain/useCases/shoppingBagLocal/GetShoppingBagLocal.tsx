import { ShoppingBagLocalRespositoryImpl } from "../../../Data/repositories/ShoppingBagLocalRepository";

const { getShoppingBag } = new ShoppingBagLocalRespositoryImpl()

export const GetShoppingBagLocalUseCase = async () => {
    return await getShoppingBag()
}