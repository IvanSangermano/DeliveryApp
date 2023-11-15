import React, { useContext, useEffect, useState } from 'react'
import { Product } from '../../../../../Domain/entities/Product'
import { ShoppingBagContext } from '../../../../context/ShoppingBagContex'

const ClientProductDetailViewModel = (product: Product) => {

    const productImageList: string[] = [
        product.image1,
        product.image2,
        product.image3
    ]

    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0.0)
    const { shoppingBag, saveItem } = useContext(ShoppingBagContext)

    useEffect(() => {
        const index = shoppingBag.findIndex((p) => p.id == product.id)
        if(index !== -1) { 
            setQuantity(shoppingBag[index].quantity!)
        }
    }, [shoppingBag])

    useEffect(() => {
        setPrice(product.price * quantity)
    }, [quantity])

    const addToBag = () => {
        if(quantity > 0) {
            product.quantity = quantity
            saveItem(product)
        }
    }

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
        shoppingBag,
        addItem,
        addToBag,
        removeItem
    }
}

export default ClientProductDetailViewModel
