import React from 'react'
import { Product } from '../../entities/Product'
import * as ImagePicker from 'expo-image-picker';
import { ProductRepositoryImpl } from '../../../Data/repositories/ProductRepository';

const {updateWithImage} = new ProductRepositoryImpl

export const updateProductWithImageUseCase = async (product: Product, files: ImagePicker.ImagePickerAsset[]) => {
  return await updateWithImage(product, files)
}