import { Product } from '../../Domain/entities/Product';
import { ShoppingBagLocalRespository } from '../../Domain/repositories/ShoppingBagLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';

export class ShoppingBagLocalRespositoryImpl implements ShoppingBagLocalRespository {
    
    async save(products: Product[]): Promise<void> {
        const { save } = LocalStorage()
        await save('shopping_bag', JSON.stringify(products))
    }
    async getShoppingBag(): Promise<Product[]> {
        const { getItem } = LocalStorage()
        const data = await getItem('shopping_bag')
        const shoppingBag: Product[] = JSON.parse(data as any)
        if(shoppingBag == null){
            return []
        } else {
            return shoppingBag
        }
    }
}