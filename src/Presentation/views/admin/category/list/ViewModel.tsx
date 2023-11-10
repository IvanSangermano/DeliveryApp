import React, { useState, useContext } from 'react'
import { Category } from '../../../../../Domain/entities/Category'
import { GetAllCategoryUseCase } from '../../../../../Domain/useCases/category/GetAllCategory'
import { DeleteCategoryUseCase } from '../../../../../Domain/useCases/category/RemoveCategory'
import { CategoryContext } from '../../../../context/CategoryContext'

const AdminCategoryListViewModel = () => {

    const {categories, getCategories ,remove} = useContext ( CategoryContext )
    const [responseMessage, setResponseMessage] = useState('')

    const deleteCategory = async (idCategory: string) => {
        const result = await remove(idCategory);
        setResponseMessage(result.message)
    }

    return {
        categories,
        responseMessage,
        getCategories,
        deleteCategory
    }
}

export default AdminCategoryListViewModel
