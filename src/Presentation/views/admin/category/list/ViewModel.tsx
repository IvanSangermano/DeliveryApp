import React, { useState, useContext } from 'react'
import { CategoryContext } from '../../../../context/CategoryContext'

const AdminCategoryListViewModel = () => {

    const {categories, getCategories ,remove} = useContext ( CategoryContext )
    const [responseMessage, setResponseMessage] = useState('')
    const [itemRemove, setItemRemove] = useState('')

    const deleteCategory = async (idCategory: string) => {
        const result = await remove(idCategory);
        setResponseMessage(result.message)
        setItemRemove('')
    }

    return {
        categories,
        itemRemove,
        responseMessage,
        getCategories,
        deleteCategory,
        setItemRemove
    }
}

export default AdminCategoryListViewModel
