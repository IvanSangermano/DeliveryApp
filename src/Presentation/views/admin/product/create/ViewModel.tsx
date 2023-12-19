import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Category } from '../../../../../Domain/entities/Category'
import { ProductContext } from '../../../../context/ProductContext'

const AdminProductCreateViewModel = (category: Category) => {

  const [values, setValues] = useState({
    name: '',
    description: '',
    image1: '',
    image2: '',
    image3: '',
    price: 0,
    id_category: category.id
  })

  const [file1, setFile1] = useState<ImagePicker.ImagePickerAsset>()
  const [file2, setFile2] = useState<ImagePicker.ImagePickerAsset>()
  const [file3, setFile3] = useState<ImagePicker.ImagePickerAsset>()

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const { create } = useContext( ProductContext )

  const pickImage = async (numberImage: number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })

    if(!result.canceled) {
      if(numberImage == 1) {
        onChange('image1', result.assets[0].uri)
        setFile1(result.assets[0])
      } else if(numberImage == 2) {
        onChange('image2', result.assets[0].uri)
        setFile2(result.assets[0])
      } else if(numberImage == 3) {
        onChange('image3', result.assets[0].uri)
        setFile3(result.assets[0])
      }
    }
  }

  const takePhoto = async (numberImage: number) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1
    })

    if(!result.canceled) {
      if(numberImage == 1) {
        onChange('image1', result.assets[0].uri)
        setFile1(result.assets[0])
      } else if(numberImage == 2) {
        onChange('image2', result.assets[0].uri)
        setFile2(result.assets[0])
      } else if(numberImage == 3) {
        onChange('image3', result.assets[0].uri)
        setFile3(result.assets[0])
      }
    }
  }

  const resetForm = async () => {
    setValues({
      name: '',
      description: '',
      image1: '',
      image2: '',
      image3: '',
      price: 0,
      id_category: category.id
    })
  }

  const onChange = (property: string, value: any) => {
      setValues({...values, [property]: value})
  }

  const createProduct = async () => {
    
    if(isValidForm()){

      let files = []
      files.push(file1!)
      files.push(file2!)
      files.push(file3!)
      setLoading(true)
      console.log("VALUES: ", values)
      const response = await create(values, files)
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
    if( values.price == 0) {
      setErrorMessage('Ingresa el precio')
      return false
    }
    if( values.image1 == '' && values.image2 == '' && values.image2 == '') {
      setErrorMessage('Ingresa al menos una imagen')
      return false
    }
    return true;
  }

  return {
    ...values,
    onChange,
    pickImage,
    takePhoto,
    createProduct,
    errorMessage,
    successMessage,
    loading
  }
}

export default AdminProductCreateViewModel
