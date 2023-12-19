import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react'
import { View, Text, Image } from 'react-native';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import styles from './Styles'
import { RoundedButton } from '../../../../components/RoundedButton';
import { ShoppingBagContext } from '../../../../context/ShoppingBagContex';

interface Props extends StackScreenProps<ClientStackParamList, 'ClientPaymentStatusScreen'>{}

export const ClientPaymentStatusScreen = ({navigation, route}: Props) => {
  
    const { paymentData } = route.params
    const { clearShoppingBag } = useContext(ShoppingBagContext)

    return (
        <View style={styles.container}>
            {
                paymentData.status === 'approved' ? 
                <Image
                    style={styles.image}
                    source={require('../../../../../../assets/check.png')}
                /> 
                :
                <Image
                    style={styles.image}
                    source={require('./../../../../../../assets/cancel.png')}
                />
            }
            {
                paymentData.status === 'approved' ? 
                <Text style={styles.description}>Tu orden fue procesada exitosamente usando {paymentData.payment_method_id} ****{paymentData.card.last_four_digits}</Text>
                :
                <Text style={styles.description}>La transaccion fallo</Text>
            }
            {
                paymentData.status === 'approved' && 
                <Text style={styles.info}>Mira el estado de tu compra en la seccion de MIS PEDIDOS</Text>
            }

            <View style={styles.button}>
                <RoundedButton
                    text='FINALIZAR COMPRA'
                    onPress={() => {
                        if(paymentData.status === 'approved'){
                            clearShoppingBag()
                            navigation.replace('ClientCategoryListScreen')
                        } else {
                            navigation.replace('ClientShoppingBagScreen')
                        }
                    }}
                />
            </View>
        </View>
    )
}
