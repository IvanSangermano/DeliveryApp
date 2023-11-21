import React, {useContext, useState, useEffect} from 'react'
import { GetByUserAddressUseCase } from '../../../../../Domain/useCases/address/GetByUserAddress'
import { Address } from '../../../../../Domain/entities/Address';
import { UserContext } from '../../../../context/UserContext';
import { CreateOrderUseCase } from '../../../../../Domain/useCases/order/CreateOrder';
import { Order } from '../../../../../Domain/entities/Order';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContex';

const ClientAddresslistViewModel = () => {
    const [address, setAddress] = useState<Address[]>([])
    const [checked, setCheked] = useState('')
    const [responseMessage, setResponseMessage] = useState('')
    const { user, saveUserSession, getUserSession } = useContext(UserContext)
    const { shoppingBag } = useContext( ShoppingBagContext )

    useEffect(() => {
        getAddress()
        if(user.address !== null && user.address !== undefined)
        {
            changeRadioValue(user.address!)
        }
    }, [user])
    
    const createOrder = async () => {
        const order: Order = {
            id_client: user.id!,
            id_address: user.address?.id!,
            products: shoppingBag
        }

        const result = await CreateOrderUseCase(order)
        setResponseMessage(result.message)
    }

    const changeRadioValue = (address: Address) => {
        setCheked(address.id!)
        user.address = address
        saveUserSession(user)
    }

    const getAddress = async () => {
        const result = await GetByUserAddressUseCase(user.id!)
        setAddress(result)
    }

    return {
        address,
        checked,
        responseMessage,
        getAddress,
        createOrder,
        changeRadioValue
    }
}

export default ClientAddresslistViewModel