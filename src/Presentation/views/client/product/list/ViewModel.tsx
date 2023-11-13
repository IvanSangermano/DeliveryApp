import React, { useState } from 'react'
import { Product } from '../../../../../Domain/entities/Product'
import { GetProductsByCategoryUseCase } from '../../../../../Domain/useCases/product/GetProductsByCategory'

const ClientProductListViewModel = () => {
  
    const [products, setProducts] = useState<Product[]>([])

    const getProducts = async (idCategory: string) => {
        const result = await GetProductsByCategoryUseCase(idCategory)
        setProducts(result)
    }

    return {
        products,
        getProducts
    }
}

export default ClientProductListViewModel