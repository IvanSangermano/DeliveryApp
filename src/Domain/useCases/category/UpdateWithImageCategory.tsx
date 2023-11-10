import React from 'react'
import { CategoryRespositoryImpl } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
import * as ImagePicker from 'expo-image-picker';

const { updateWithImage } = new CategoryRespositoryImpl();
 
export const UpdateWithImageCategoryUseCase = async (category: Category, file: ImagePicker.ImagePickerAsset) => {
  return await updateWithImage(category, file)
}