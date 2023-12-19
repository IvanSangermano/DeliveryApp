import { createContext, useEffect, useState } from "react";
import { Product } from "../../Domain/entities/Product";
import { GetShoppingBagLocalUseCase } from "../../Domain/useCases/shoppingBagLocal/GetShoppingBagLocal";
import { SaveShoppingBagLocalUseCase } from "../../Domain/useCases/shoppingBagLocal/SaveShoppingBagLocal";

export interface ShoppingBagContextProps {
    shoppingBag: Product[],
    total: number,
    getTotal(): Promise<void>,
    getShoppingBag(): Promise<void>,
    saveItem(product: Product): Promise<void>,
    deleteItem(product: Product): Promise<void>,
    clearShoppingBag(): Promise<void>
}

export const ShoppingBagContext = createContext({} as ShoppingBagContextProps)

export const ShoppingBagProvider = ({children}: any) => {

    const [shoppingBag, setShoppingBag] = useState<Product[]>([])
    const [total, setTotal] = useState(0.0)

    useEffect(() => {
        getShoppingBag()
    }, [])

    useEffect(() => {
        getTotal()
    }, [shoppingBag])

    const getTotal = async (): Promise<void> => {
        setTotal(0)
        let totalPrice = 0
        shoppingBag.forEach(product => {
            totalPrice = totalPrice + (product.quantity! * product.price)
        })
        setTotal(totalPrice)
    }

    const getShoppingBag = async(): Promise<void> => {
        const result = await GetShoppingBagLocalUseCase()
        setShoppingBag(result)
    }

    const saveItem = async (product: Product): Promise<void> => {
        const index = shoppingBag.findIndex((p) => p.id == product.id)
        if(index == -1) { //producto no agregado a la bolsa de compra -> insertar en lista
            shoppingBag.push(product)
        } else {          //Producto ya agregado -> se modifica la cantidad ordenada
            shoppingBag[index].quantity = product.quantity
        }
        await SaveShoppingBagLocalUseCase(shoppingBag)
        getShoppingBag()
    }

    const deleteItem = async (product: Product): Promise<void> => {
        const index = shoppingBag.findIndex((p) => p.id == product.id)
        shoppingBag.splice(index, 1)
        await SaveShoppingBagLocalUseCase(shoppingBag)
        getShoppingBag()
    }

    const clearShoppingBag = async (): Promise<void> => {
        await SaveShoppingBagLocalUseCase([])
        getShoppingBag()
    }

    return (
        <ShoppingBagContext.Provider value={{
            shoppingBag,
            total,
            getTotal,
            getShoppingBag,
            saveItem,
            deleteItem,
            clearShoppingBag
        }}
        >
            {children}
        </ShoppingBagContext.Provider>
    )
}