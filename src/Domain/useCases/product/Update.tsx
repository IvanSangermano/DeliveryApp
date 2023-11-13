import React from 'react'
import { Product } from '../../entities/Product'
import * as ImagePicker from 'expo-image-picker';
import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository';

const {update} = new ProductRepositoryImpl

export const updateProductUseCase = async (product: Product) => {
  return await update(product)
}