import React from 'react'
import { Product } from '../../../../../Domain/entities/Product'
import { View, StyleSheet, Image, Text } from 'react-native';

interface Props {
    product: Product
}

export const OrderDetailItem = ({ product }: Props) => {
  return (
    <View style={ styles.container }>
        <View>
            <Image
                source={{ uri: product.image1 }}
                style={ styles.image }
            />
        </View>
        <View style={ styles.productInfo }>
            <Text style={ styles.name }>{ product.name }</Text>
            <Text style={ styles.quantity }>Cantidad: { product.quantity }</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20,
        alignItems: 'center'
    },
    productInfo: {
        marginLeft: 15
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 15
    },
    name: {
        fontWeight: 'bold'
    },
    quantity: {
        fontSize: 13,
        marginTop: 5
    }
})
