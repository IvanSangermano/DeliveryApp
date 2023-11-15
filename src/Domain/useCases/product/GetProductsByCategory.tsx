import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository'

const { getProductsByCategory } = new ProductRepositoryImpl()

export const GetProductsByCategoryUseCase = async (idCategory: string) => {
  return await getProductsByCategory(idCategory)
}
