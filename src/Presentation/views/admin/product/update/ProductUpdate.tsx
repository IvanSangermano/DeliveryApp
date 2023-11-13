import React, { useEffect, useState } from 'react'
import { View, Image, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, Text } from 'react-native';
import styles from './Styles'
import { MyColors } from '../../../../theme/AppTheme';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { RoundedButton } from '../../../../components/RoundedButton';
import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import { ModalPickMultipleImage } from '../../../../components/ModalPickMultipleImage';

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductUpdateScreen'>{}

export const AdminProductUpdateScreen = ({ navigation, route}: Props) => {
    
    const { product, category } = route.params
    const {name, description, price, image1, image2, image3, errorMessage, successMessage, loading, onChange, pickImage, takePhoto, updateProduct } = useViewModel(product, category)
    const [modalVisible, setModalVisible] = useState(false);
    const [numberImage, setNumberImage] = useState(1);

    useEffect(() => {
        if(errorMessage != '') ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    }, [errorMessage])
    useEffect(() => {
        if(successMessage != '') ToastAndroid.show(successMessage, ToastAndroid.LONG)
    }, [successMessage])


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => {
                    setNumberImage(1)
                    setModalVisible(true)
                }}>
                {
                    image1 == ''
                    ?   <Image
                        source={require('../../../../../../assets/image_new.png')}
                        style={styles.logoImage}
                    />
                    : <Image
                        source={{uri: image1}}
                        style={styles.logoImage}
                    />
                }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setNumberImage(2)
                    setModalVisible(true)
                }}>
               {
                    image2 == ''
                    ?   <Image
                        source={require('../../../../../../assets/image_new.png')}
                        style={styles.logoImage}
                    />
                    : <Image
                        source={{uri: image2}}
                        style={styles.logoImage}
                    />
                }
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setNumberImage(3)
                    setModalVisible(true)
                }}>
               {
                    image3 == ''
                    ?   <Image
                        source={require('../../../../../../assets/image_new.png')}
                        style={styles.logoImage}
                    />
                    : <Image
                        source={{uri: image3}}
                        style={styles.logoImage}
                    />
                }
                </TouchableOpacity>

            </View>

            <View style={styles.form}>


                <ScrollView>
                    <View style={styles.categoryInfo}>
                        <Image
                            style={styles.imageCategory}
                            source={require('../../../../../../assets/menu.png')}
                        />
                        <Text style={styles.textCategory}>Categoria seleccionada</Text>
                        <Text>{category.name}</Text>

                    </View>

                    <CustomTextInput
                        placeholder='Nombre del producto'
                        image={require('../../../../../../assets/categories.png')}
                        keyboardType='default'
                        property='name'
                        value={name}
                        onChangeText={ onChange }
                    />

                    <CustomTextInput
                        placeholder='Descripcion'
                        image={require('../../../../../../assets/description.png')}
                        keyboardType='default'
                        property='description'
                        value={description}
                        onChangeText={ onChange }
                    />

                    <CustomTextInput
                        placeholder='Precio'
                        image={require('../../../../../../assets/price.png')}
                        keyboardType='numeric'
                        property='price'
                        value={price.toString()}
                        onChangeText={ onChange }
                    />

                </ScrollView>

                <View style={{marginTop: 20}}>
                    <RoundedButton text='CREAR PRODUCTO' onPress={() => updateProduct()} />
                </View>
            
            </View>
            <ModalPickMultipleImage
                openGallery={ pickImage }
                openCamera={ takePhoto }
                modalUseState= {modalVisible}
                setModalUseState={ setModalVisible }
                numberImage={numberImage}
            /> 
            {loading && <ActivityIndicator size="large" color={MyColors.primary} style={styles.loading}/>}
        </View>
  )
}
