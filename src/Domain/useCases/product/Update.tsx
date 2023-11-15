import { Product } from '../../entities/Product'
import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository';

const {update} = new ProductRepositoryImpl

export const updateProductUseCase = async (product: Product) => {
  return await update(product)
}