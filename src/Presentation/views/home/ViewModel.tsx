import React, { useEffect, useState } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { GetUserLocalUseCase } from '../../../Domain/useCases/userLocal/GetUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const HomeViewModel = () => {
    
    const { user, getUserSession } = useUserLocal()
    
    const [errorMessage, setErrorMessage] = useState('')
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    console.log('Usuario sesion: ', JSON.stringify(user))

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value})
    }
    
    const login = async () => {
        console.log('isvalidform',isValidForm())
        if(isValidForm()){
            const response = await LoginAuthUseCase(values.email, values.password)
            console.log('RESPONSE ', JSON.stringify(response))
            if(!response.success){
                setErrorMessage(response.message)
            }
            else {
                await SaveUserLocalUseCase(response.data)
                getUserSession()
            }
        }
    }

    const isValidForm = ():boolean => {
        if(values.email === ''){
            setErrorMessage('Ingresa el correo electronico')
            return false;
        }
        if(values.password === ''){
            setErrorMessage('Ingresa la contraseña')
            return false;
        }
        return true;
    }


    return {
        ...values,
        user,
        errorMessage,
        onChange,
        login
    }
}

export default HomeViewModel
