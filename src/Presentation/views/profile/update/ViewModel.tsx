import React, { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { UpdateUserUseCase } from '../../../../Domain/useCases/user/UpdateUser'
import { UpdateUserWithImageUseCase } from '../../../../Domain/useCases/user/UpdateUserWithImage'
import { User } from '../../../../Domain/entities/User'
import { ResponseAPIDelivery } from '../../../../Data/sources/remote/models/ResponseApiDelivery'
import { UserContext } from '../../../context/UserContext'

const ProfileUpdateViewModel = (user: User) => {

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState(user)
    const { saveUserSession } = useContext(UserContext)


    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1
      })

      if(!result.canceled) {
        onChange('image', result.assets[0].uri)
        setFile(result.assets[0])
      }
    }

    const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1
      })

      if(!result.canceled) {
        onChange('image', result.assets[0].uri)
        setFile(result.assets[0])
      }
    }

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value})
    }

    const onChangeInfoUpdate = (name: string, lastname: string, phone: string) => {
      setValues({...values, name, lastname, phone})
  }

    const update = async () => {
      if(isValidForm()){
        setLoading(true)
        let response = {} as ResponseAPIDelivery

        if(values.image?.includes('https://')) {
          response = await UpdateUserUseCase(values) 
        } else {
          response = await UpdateUserWithImageUseCase(values, file!) 
        }

        setLoading(false)
        console.log('Result: ' + JSON.stringify(response))
        if(response.success){
          saveUserSession(response.data)
          setSuccessMessage(response.message)
        }else {
          setErrorMessage(response.message)
        }
      }
    }

    const isValidForm = (): boolean  => {
      if( values.name == '') {
        setErrorMessage('Ingresa tu nombre')
        return false
      }
      if( values.lastname == '') {
        setErrorMessage('Ingresa tu apellido')
        return false
      }
      if( values.phone == '') {
        setErrorMessage('Ingresa tu telefono')
        return false
      }
      return true;
    }

  return {
    ...values,
    onChange,
    onChangeInfoUpdate,
    update,
    pickImage,
    takePhoto,
    errorMessage,
    user,
    loading,
    successMessage
  }
}

export default ProfileUpdateViewModel
