import React from 'react'
import { CategoryRespositoryImpl } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';

const { update } = new CategoryRespositoryImpl();
 
export const UpdateCategoryUseCase = async (category: Category) => {
  return await update(category)
}