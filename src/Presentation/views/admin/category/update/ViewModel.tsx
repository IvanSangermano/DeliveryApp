import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Category } from '../../../../../Domain/entities/Category'
import { CategoryContext } from '../../../../context/CategoryContext';

const AdminCategoryUpdateViewModel = (category: Category) => {

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState(category)
    const {update, updateWithImage} = useContext( CategoryContext )

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

    const updateCategory = async () => {
      if(isValidForm()){
        setLoading(true)
        let response
        if(values.image?.includes('https://')) {
          response = await update(values)
        }else{
          response = await updateWithImage(values, file!)
        }
        setLoading(false)
        if(response.success){
          setSuccessMessage(response.message)
        }else {
          setErrorMessage(response.message)
        }
      }
    }

    const isValidForm = (): boolean  => {
      if( values.name == '') {
        setErrorMessage('Ingresa el nombre')
        return false
      }
      if( values.description == '') {
        setErrorMessage('Ingresa la description')
        return false
      }
      return true;
    }

  return {
    ...values,
    onChange,
    pickImage,
    takePhoto,
    updateCategory,
    errorMessage,
    successMessage,
    loading
  }
}

export default AdminCategoryUpdateViewModel
