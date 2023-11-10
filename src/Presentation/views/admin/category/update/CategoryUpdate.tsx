import React, { useEffect, useState } from 'react'
import { View, Image, ActivityIndicator, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import styles from './Styles'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { MyColors } from '../../../../theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator';

interface Props extends StackScreenProps<CategoryStackParamList, 'AdminCategoryUpdateScreen'>{}


export const AdminCategoryUpdateScreen = ({navigation, route}: Props) => {
    const { category } = route.params
    const {name, description, image, errorMessage, successMessage, loading, onChange, pickImage, takePhoto, updateCategory } = useViewModel(category)
    const [modalVisible, setModalVisible] = useState(false);
    
    useEffect(() => {
        if(errorMessage != '') ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    }, [errorMessage])
    useEffect(() => {
        if(successMessage != '') ToastAndroid.show(successMessage, ToastAndroid.LONG)
    }, [successMessage])

  return (
    <View style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {
                        image == ''
                        ?   <Image
                            source={require('../../../../../../assets/image_new.png')}
                            style={styles.logoImage}
                        />
                        : <Image
                            source={{uri: image}}
                            style={styles.logoImage}
                        />
                    }
                </TouchableOpacity>

            </View>

            <View style={styles.form}>

                <ScrollView>
                    <CustomTextInput
                        image={require('../../../../../../assets/categories.png')}
                        placeholder='Nombre de la categoria'
                        keyboardType='default'
                        property='name'
                        onChangeText={ onChange }
                        value={name}
                    />

                    <CustomTextInput
                        image={require('../../../../../../assets/description.png')}
                        placeholder='Descripcion'
                        keyboardType='default'
                        property='description'
                        onChangeText={ onChange }
                        value={description}
                    />

                </ScrollView>

                <View style={{marginTop: 20}}>
                    <RoundedButton text='ACTUALIZAR CATEGORIA' onPress={() => updateCategory()} />
                </View>
            
            </View>
            <ModalPickImage
                openGallery={ pickImage }
                openCamera={ takePhoto }
                modalUseState= {modalVisible}
                setModalUseState={ setModalVisible }
            />
            {loading && <ActivityIndicator size="large" color={MyColors.primary} style={styles.loading}/>}
        </View>
  )
}
