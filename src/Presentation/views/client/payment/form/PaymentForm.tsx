import React, { useEffect } from 'react'
import { View, Image, Pressable, Text, TouchableOpacity } from 'react-native';
import styles from './Styles'
import useViewModel from './ViewModel'
import CreditCard from 'react-native-credit-card-form-ui';
import DropDownPicker from 'react-native-dropdown-picker';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { StackScreenProps } from '@react-navigation/stack';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentFormScreen'>{}

export const ClientPaymentFormScreen = ({navigation, route}: Props) => {

    const {open, value, items, creditCardRef, cardToken, identificationNumber, mercadoPagoOption,
        onChange ,setOpen, setValue, setItems, setMercadoPagoOption, handleSubmit, getIdentificationTypes} = useViewModel()

    useEffect(() => {
        getIdentificationTypes()
    }, [])
    
    useEffect(() => {
        if(cardToken !== undefined && cardToken !== null && mercadoPagoOption){
            navigation.navigate('ClientPaymentInstallmentsScreen', {cardToken})
        }
    }, [cardToken])

    return (
        <View style={styles.container}>
            <View style={styles.payments}>
                <TouchableOpacity 
                    style={mercadoPagoOption ? {...styles.paymentMP, borderColor: '#353130'} : {...styles.paymentMP, borderColor: '#e8e8e8'}}
                    onPress={() => setMercadoPagoOption(true)}
                    >
                    <Image
                        source={require('../../../../../../assets/mercado_pago.png')}
                        style={styles.imagePayMP}
                        />
                    <Text style={styles.paymentMPText}>Mercado Pago</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={!mercadoPagoOption ? {...styles.paymentSRP, borderColor: '#353130'} : {...styles.paymentSRP, borderColor: '#e8e8e8'}}
                    onPress={() => setMercadoPagoOption(false)}
                    >
                    <Text style={styles.paymentSRPText}>Debito/Credito</Text>
                    <Image
                        source={require('../../../../../../assets/stripe.png')}
                        style={styles.imagePaySRP}
                        />
                </TouchableOpacity>
            </View>
            <View style={styles.form} >
                <CreditCard 
                    ref={creditCardRef} 
                    background={ '#e8e8e8' } 
                    textColor={'black'}
                    labels={{
                        holder: 'Titular',
                        cvv: 'Codigo de seguridad',
                        expiration: 'Vencimiento'
                    }}
                    placeholders={{
                        number: '0000 0000 0000 0000',
                        cvv: 'xxx',
                        expiration: 'MM/YYYY',
                        holder: 'NOMBRE DEL TITULAR'
                    }}
                    placeholderTextColor='gray'
                    />
            </View>
            <View style={ styles.dropDown }>
                {mercadoPagoOption &&
                    <>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                        <CustomTextInput
                            image={require('../../../../../../assets/document.png')}
                            placeholder='Numero de identificacion'
                            keyboardType='default'
                            property='identificationNumber'
                            onChangeText={ onChange }
                            value={ identificationNumber }
                        />
                    </>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={() => handleSubmit()}>
                    <Image
                        source={require('../../../../../../assets/check.png')}
                        style={styles.check}
                        />
                </Pressable>
            </View>
        </View>
    )
}
