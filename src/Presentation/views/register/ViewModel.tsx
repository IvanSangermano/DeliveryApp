import React, { useContext, useState } from 'react'
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/auth/RegisterWithImageAuth'
import * as ImagePicker from 'expo-image-picker'
import { UserContext } from '../../context/UserContext'

const RegisterViewModel = () => {
    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const {user, saveUserSession} = useContext( UserContext )
    const [values, setValues] = useState({
        name:'',
        lastname:'',
        email:'',
        phone:'',
        image:'',
        password:'',
        confirmPassword:'',
    })


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

    const register = async () => {
      if(isValidForm()){
        setLoading(true)
        //const response = await RegisterAuthUseCase(values)
        const response = await RegisterWithImageAuthUseCase(values, file!)
        setLoading(false)
        if(response.success){
          await saveUserSession(response.data)
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
      if( values.email == '') {
        setErrorMessage('Ingresa tu email')
        return false
      }
      if( values.phone == '') {
        setErrorMessage('Ingresa tu telefono')
        return false
      }
      if( values.password == '') {
        setErrorMessage('Ingresa la contraseña')
        return false
      }
      if( values.confirmPassword == '') {
        setErrorMessage('Ingresa la confirmacion de la contraseña')
        return false
      }
      if(values.password !== values.confirmPassword){
        setErrorMessage('Las contraseñas no coinciden')
        return false
      }
      if(values.image === ''){
        setErrorMessage('Seleccione una imagen')
        return false
      }

      return true;
    }

  return {
    ...values,
    onChange,
    register,
    pickImage,
    takePhoto,
    errorMessage,
    user,
    loading
  }
}

export default RegisterViewModel
