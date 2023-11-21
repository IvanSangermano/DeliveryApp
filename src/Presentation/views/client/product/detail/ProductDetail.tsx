import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import styles from './Styles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductDetailScreen'>{}

export const ClientProductDetailScreen = ({navigation, route}: Props) => {
    
    const {product} = route.params
    const { shoppingBag ,productImageList, quantity, price, responseMessage, addToBag, addItem, removeItem} = useViewModel(product)

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

    useEffect(() => {
        if(responseMessage !== ''){
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

    return (
        <View style={styles.container}>
          <GestureHandlerRootView >
            <Carousel
                loop={true}
                width={width}
                height={height}
                autoPlay={true}
                data={productImageList }
                autoPlayInterval={7000}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                    <Image 
                        source={{uri: item}} 
                        style={styles.productImage}
                    />
                )}
            />
            </GestureHandlerRootView> 
            <View style={styles.productDetail}>
                <View style={styles.productInfo}>
                    <Text style={styles.name}>{product.name}</Text>
                    <View style={styles.divider}/>

                    <Text style={styles.descriptionTitle}>Descripcion</Text>
                    <Text style={styles.descriptionContent}>{product.description}</Text>
                    <View style={styles.divider}/>

                    <Text style={styles.descriptionTitle}>Precio</Text>
                    <Text style={styles.descriptionContent}>{product.price}</Text>
                    <View style={styles.divider}/>

                    <Text style={styles.descriptionTitle}>Tu orden</Text>
                    <Text style={styles.descriptionContent}>Cantidad: {quantity}</Text>
                    <Text style={styles.descriptionContent}>Precio total: {price}</Text>
                    <View style={styles.divider}/>
                </View>
                <View style={styles.productActions}>
                    <TouchableOpacity 
                        style={styles.actionLess}
                        onPress={() => removeItem()}
                    >
                        <Text style={styles.actionText}>-</Text>
                    </TouchableOpacity>

                    <View style={styles.quantity}>
                        <Text style={styles.actionText}>{quantity}</Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.actionAdd}
                        onPress={() => addItem()}
                    >
                        <Text style={styles.actionText}>+</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonAdd}>
                        <RoundedButton text='AGREGAR AL PEDIDO' onPress={() => addToBag()}/>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.pop()}
            >
                <Image 
                    style={styles.backImage}
                    source={require('../../../../../../assets/back.png')}
                />
            </TouchableOpacity>
        </View>
    )
}
