import React from "react";
import { Product } from "../../entities/Product";
import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
const { remove } = new ProductRepositoryImpl


export const RemoveProductUseCase = async (product: Product) => {
    return await remove(product)
}