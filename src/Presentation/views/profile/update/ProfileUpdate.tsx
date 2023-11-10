import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RoundedButton } from '../../../../Presentation/components/RoundedButton';
import useViewModel from './ViewModel'
import { CustomTextInput } from '../../../components/CustomTextInput';
import styles from './Styles'
import { ModalPickImage } from '../../../components/ModalPickImage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigator/MainStackNavigator';
import { MyColors } from '../../../theme/AppTheme';

interface Props extends StackScreenProps<RootStackParamList, 'ProfileUpdateScreen'>{}

export const ProfileUpdateScreen = ({navigation, route}: Props) => {

    const { user } = route.params
    const {name, lastname, image, phone, errorMessage, successMessage, loading,
           onChange, update, pickImage, takePhoto } = useViewModel(user)

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if(errorMessage != '') ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    }, [errorMessage])
    useEffect(() => {
        if(successMessage != '') ToastAndroid.show(successMessage, ToastAndroid.LONG)
    }, [successMessage])

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../../../assets/city.jpg')} 
                style={styles.imageBackgound}
            />
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {
                        user?.image == ''
                        ?   <Image
                            source={require('../../../../../assets/user_image.png')}
                            style={styles.logoImage}
                        />
                        : <Image
                            source={{uri: image}}
                            style={styles.logoImage}
                        />
                    }
                </TouchableOpacity>

                <Text style={styles.logoText}>SELECCIONA UNA IMAGEN</Text>
            </View>

            <View style={styles.form}>

                <ScrollView>

                    <Text style={styles.formText}>ACTUALIZAR</Text>

                    <CustomTextInput
                        image={require('../../../../../assets/user.png')}
                        placeholder='Nombres'
                        keyboardType='default'
                        property='name'
                        onChangeText={ onChange }
                        value={name}
                    />

                    <CustomTextInput
                        image={require('../../../../../assets/my_user.png')}
                        placeholder='Apellidos'
                        keyboardType='default'
                        property='lastname'
                        onChangeText={ onChange }
                        value={lastname}
                    />

                    <CustomTextInput
                        image={require('../../../../../assets/phone.png')}
                        placeholder='Telefono'
                        keyboardType='numeric'
                        property='phone'
                        onChangeText={ onChange }
                        value={phone}
                    />

                </ScrollView>

                <View style={{marginTop: 20}}>
                    <RoundedButton text='CONFIRMAR' onPress={() => {update();}} />
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

