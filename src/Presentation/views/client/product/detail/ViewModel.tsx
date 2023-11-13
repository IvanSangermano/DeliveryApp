import React, { useEffect, useState } from 'react'
import { Product } from '../../../../../Domain/entities/Product'

const ClientProductDetailViewModel = (product: Product) => {

    const productImageList: string[] = [
        product.image1,
        product.image2,
        product.image3
    ]

    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0.0)

    useEffect(() => {
        setPrice(product.price * quantity)
    }, [quantity])

    const addItem = () => {
        setQuantity(quantity + 1)
    }
    const removeItem = () => {
        quantity > 0 && setQuantity(quantity - 1)
    }

    return {
        productImageList,
        quantity,
        price,
        addItem,
        removeItem
    }
}

export default ClientProductDetailViewModel
