import React, {useContext, useState, useEffect} from 'react'
import { GetByUserAddressUseCase } from '../../../../../Domain/useCases/address/GetByUserAddress'
import { Address } from '../../../../../Domain/entities/Address';
import { UserContext } from '../../../../context/UserContext';

const ClientAddresslistViewModel = () => {
    const [address, setAddress] = useState<Address[]>([])
    const { user, saveUserSession, getUserSession } = useContext(UserContext)
    const [checked, setCheked] = useState('')

    useEffect(() => {
        getAddress()
        if(user.address !== null && user.address !== undefined)
        {
            changeRadioValue(user.address!)
        }
    }, [user])
    

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
        getAddress,
        changeRadioValue
    }
}

export default ClientAddresslistViewModel