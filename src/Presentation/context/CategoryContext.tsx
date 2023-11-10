import { createContext, useState, useEffect } from "react";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Category } from '../../Domain/entities/Category';
import * as ImagePicker from 'expo-image-picker';
import { GetAllCategoryUseCase } from "../../Domain/useCases/category/GetAllCategory";
import { CreateCategoryUseCase } from "../../Domain/useCases/category/CreateCategory";
import { UpdateCategoryUseCase } from "../../Domain/useCases/category/UpdateCategory";
import { UpdateWithImageCategoryUseCase } from "../../Domain/useCases/category/UpdateWithImageCategory";
import { DeleteCategoryUseCase } from "../../Domain/useCases/category/RemoveCategory";

export interface CategoryContextProps {
    categories: Category[],
    getCategories(): Promise<Category[]>,
    create(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery>,
    update(category: Category): Promise<ResponseAPIDelivery>,
    updateWithImage(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery>,
    remove(id: string): Promise<ResponseAPIDelivery>,
}

export const CategoryContext = createContext( { } as CategoryContextProps)

export const CategoryProvider = ({children}: any)  => {

    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        if(categories.length === 0) getCategories()
      }, [])

    const getCategories = async ():Promise<Category[]> => {
        const result = await GetAllCategoryUseCase()
        setCategories(result)
        return result
    }

    const create = async (category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery> => {
        const response = await CreateCategoryUseCase(category, file!)
        getCategories()
        return response
    }

    const update = async(category: Category): Promise<ResponseAPIDelivery> => {
        const response = await UpdateCategoryUseCase(category)
        getCategories()
        return response
    }

    const updateWithImage = async(category: Category, file: ImagePicker.ImagePickerAsset): Promise<ResponseAPIDelivery> => {
        const response = await UpdateWithImageCategoryUseCase(category, file!)
        getCategories()
        return response
    }
    
    const remove = async (idCategory: string): Promise<ResponseAPIDelivery> => {
        const response = await DeleteCategoryUseCase(idCategory);
        getCategories()
        return response
    }

    return (
        <CategoryContext.Provider value={{
            categories,
            getCategories,
            create,
            update,
            updateWithImage,
            remove
        }}>
            {children}
        </CategoryContext.Provider>
    )
}