import React from 'react'
import { Product } from '../../../../Domain/entities/Product'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
    product: Product,
    addItem: (product: Product) => void,
    subtractItem: (product: Product) => void,
    deleteItem: (product: Product) => void
}

export const ShoppingBagItem = ({product, addItem, subtractItem, deleteItem}: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
                style={styles.image}
                source={{uri: product.image1}}
            />
        </View>
        <View style={styles.productInfo}>
            <View style={styles.containInfo}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{product.quantity! * product.price}$</Text>
            </View>
            <View style={styles.productAction}>
                <View style={styles.actions}>
                    <TouchableOpacity 
                        style={styles.actionLess}
                        onPress={() => subtractItem(product)}
                    >
                        <Text style={styles.actionText}>-</Text>
                    </TouchableOpacity>

                    <View style={styles.quantity}>
                        <Text style={styles.actionText}>{product.quantity}</Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.actionAdd}
                        onPress={() => addItem(product)}
                    >
                        <Text style={styles.actionText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => deleteItem(product)}
                >
                    <Image 
                        style={styles.deleteItem}
                        source={require('../../../../../assets/trash.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5
    },
    imageContainer: {

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
    },
    productInfo: {
        flex: 1
    },
    containInfo:{
        flexDirection: 'row'
    },
    title: {
        color: 'black',
        fontSize: 14,
        marginLeft: 15,
        flex: 1
    },
    price: {
        marginRight: 40,
        fontWeight: 'bold'
    },
    productAction: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 7,
        marginRight: 40
    },
    actions: {
        flexDirection: 'row',
        flex: 1,
    },
    actionLess: {
        backgroundColor: '#E8E8E8',
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    actionAdd: {
        backgroundColor: '#E8E8E8',
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    quantity: {
        backgroundColor: '#E8E8E8',
        height: 30,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    actionText: {
        color: 'black',
        fontSize: 15
    },
    deleteItem: {
        width: 25,
        height: 25
    },
})
