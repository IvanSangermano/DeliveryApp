import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { CategoryContext } from '../../../../context/CategoryContext'

const AdminCategoryCreateViewModel = () => {

    const [file, setFile] = useState<ImagePicker.ImagePickerAsset>()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({
        name:'',
        description:'',
        image:''
    })

    const { create } = useContext( CategoryContext )


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

    const resetForm = async () => {
      setValues({
        name:'',
        description:'',
        image:''
      })
    }

    const onChange = (property: string, value: any) => {
        setValues({...values, [property]: value})
    }

    const createCategory = async () => {
      if(isValidForm()){
        setLoading(true)
        const response = await create(values, file!)
        setLoading(false)
        if(response.success){
          setSuccessMessage(response.message)
          resetForm()
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
      if( values.image == '') {
        setErrorMessage('Ingresa una imagen')
        return false
      }
      return true;
    }

  return {
    ...values,
    onChange,
    pickImage,
    takePhoto,
    createCategory,
    errorMessage,
    successMessage,
    loading
  }
}

export default AdminCategoryCreateViewModel
