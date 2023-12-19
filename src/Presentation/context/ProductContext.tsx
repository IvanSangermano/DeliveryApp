import { Product } from '../../Domain/entities/Product';
import * as ImagePicker from 'expo-image-picker';
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext, useState } from "react";
import { CreateProductUseCase } from "../../Domain/useCases/product/CreateProduct";
import { GetProductsByCategoryUseCase } from "../../Domain/useCases/product/GetProductsByCategory";
import { RemoveProductUseCase } from "../../Domain/useCases/product/RemoveProduct";
import { updateProductWithImageUseCase } from '../../Domain/useCases/product/UpdateProduct';
import { updateProductUseCase } from '../../Domain/useCases/product/Update';

export interface ProductContextProps {
    products: Product[]
    getProducts(idCategory: string): Promise<void>
    create(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>
    updateWithImage(product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery>
    update(product: Product): Promise<ResponseAPIDelivery>
    remove(product: Product): Promise<ResponseAPIDelivery>
}

export const ProductContext = createContext({} as ProductContextProps)

export const ProductProvider = ({children}: any) => {
    const [products, setProducts] = useState<Product[]>([])

    const getProducts = async (idCategory: string): Promise<void> => {
        const result = await GetProductsByCategoryUseCase(idCategory)
        setProducts(result)
    }

    const create = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery> => {
        const response = await CreateProductUseCase(product, files)
        getProducts(product.id_category!)
        return response
    }

    const update = async (product: Product): Promise<ResponseAPIDelivery> => {
        const response = await updateProductUseCase(product)
        getProducts(product.id_category!)
        return response
    }

    const updateWithImage = async (product: Product, files: ImagePicker.ImagePickerAsset[]): Promise<ResponseAPIDelivery> => {
        const response = await updateProductWithImageUseCase(product, files)
        getProducts(product.id_category!)
        return response
    }

    const remove = async (product: Product): Promise<ResponseAPIDelivery> => {
        const response = await RemoveProductUseCase(product)
        getProducts(product.id_category!)
        return response
    }

    return (
        <ProductContext.Provider value={{
            products,
            getProducts,
            create,
            updateWithImage,
            update,
            remove,
        }}>
            {children}
        </ProductContext.Provider>
    )
}