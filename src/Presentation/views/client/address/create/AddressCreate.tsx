import React, { useEffect, useState } from 'react'
import { View, Image, ActivityIndicator, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import styles from './Styles'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors } from '../../../../theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientAddressCreateScreen'>{}

export const ClientAddressCreateScreen = ({navigation, route}: Props) => {

    const {address, neighborhood, refPoint, errorMessage, successMessage, loading, onChange, onChangeRefPoing, createAddress } = useViewModel()
    
    useEffect(() => {
        if(route.params?.refPoint){
            onChangeRefPoing(route.params?.refPoint, route.params?.latitude, route.params?.longitude)
        }
    }, [route.params?.refPoint])


    useEffect(() => {
        if(errorMessage != '') ToastAndroid.show(errorMessage, ToastAndroid.LONG)
    }, [errorMessage])
    useEffect(() => {
        if(successMessage != '') ToastAndroid.show(successMessage, ToastAndroid.LONG)
    }, [successMessage])

  return (
    <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../../../../assets/map.png')}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.form}>

                <ScrollView>
                    <CustomTextInput
                        image={require('../../../../../../assets/location.png')}
                        placeholder='Nombre de la direccion'
                        keyboardType='default'
                        property='address'
                        onChangeText={ onChange }
                        value={address}
                    />

                    <CustomTextInput
                        image={require('../../../../../../assets/neighborhood.png')}
                        placeholder='Barrio'
                        keyboardType='default'
                        property='neighborhood'
                        onChangeText={ onChange }
                        value={neighborhood}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ClientAddressMapScreen')}
                    >
                        <CustomTextInput
                            image={require('../../../../../../assets/ref_point.png')}
                            placeholder='Punto de referencia'
                            keyboardType='default'
                            property='refPoint'
                            onChangeText={ onChange }
                            value={refPoint}
                            editable={false}
                        />
                    </TouchableOpacity>
                    

                </ScrollView>

                <View style={{marginTop: 20}}>
                    <RoundedButton text='CREAR CATEGORIA' onPress={() => createAddress()} />
                </View>
            
            </View>
            {loading && <ActivityIndicator size="large" color={MyColors.primary} style={styles.loading}/>}
        </View>
  )
}
