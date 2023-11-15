import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { CreateAddressUseCase } from '../../../../../Domain/useCases/address/CreateAddress'

const ClientAddressCreateViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        address:'',
        neighborhood:'',
        refPoint:'',
        lat: 0.0,
        lng: 0.0,
        id_user: ''
    })
    const { user, saveUserSession, getUserSession } = useContext( UserContext )

    useEffect(() => {
      if(user.id){
        onChange('id_user', user.id)
      }
    }, [user])
    

    const resetForm = async () => {
      setValues({
        address:'',
        neighborhood:'',
        refPoint:'',
        lat: 0.0,
        lng: 0.0,
        id_user: user.id!
      })
    }

    const onChange = (property: string, value: any) => {
      setValues({...values, [property]: value})
    }

    const onChangeRefPoing = (refPoint: string, lat:number, lng: number) => {
      setValues({...values, refPoint: refPoint, lat: lat, lng: lng})
    }

    const createAddress = async () => {
      if(isValidForm()){
        setLoading(true)
        const response = await CreateAddressUseCase(values)
        setLoading(false)
        if(response.success){
          setSuccessMessage(response.message)
          user.address = values
          user.address.id = response.data
          await saveUserSession(user)
          getUserSession()
          resetForm()
        }else {
          setErrorMessage(response.message)
        }
      }
  }

    const isValidForm = (): boolean  => {
      if( values.address == '') {
        setErrorMessage('Ingresa la direccion')
        return false
      }
      if( values.neighborhood == '') {
        setErrorMessage('Ingresa el barrio')
        return false
      }
      if( values.refPoint == '') {
        setErrorMessage('Ingresa un punto de referencia')
        return false
      }
      return true;
    }

  return {
    ...values,
    errorMessage,
    successMessage,
    loading,
    onChange,
    onChangeRefPoing,
    createAddress
  }
}

export default ClientAddressCreateViewModel
