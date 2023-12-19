import React, {useContext, useState} from 'react'
import { ProductContext } from '../../../../context/ProductContext'
import { Product } from '../../../../../Domain/entities/Product'
import { Category } from '../../../../../Domain/entities/Category';

const AdminProductListViewModel = (category: Category) => {
  
    const {products, getProducts, remove} = useContext(ProductContext)

    const [responseMessage, setResponseMessage] = useState('')
    const [itemRemove, setItemRemove] = useState<Product>({
        name: '',
        description: '',
        image1: '',
        image2: '',
        image3: '',
        price: 0,
        id_category: category.id
    })

    const clearItem = () => {
        setItemRemove({
            name: '',
            description: '',
            image1: '',
            image2: '',
            image3: '',
            price: 0,
            id_category: category.id
        })
    }

    const deleteProduct = async (product: Product) => {
        const result = await remove(product);
        setResponseMessage(result.message)
        clearItem()
    }

    return {
        products,
        itemRemove,
        responseMessage,
        getProducts,
        clearItem,
        setItemRemove,
        deleteProduct,
    }
}

export default AdminProductListViewModel
