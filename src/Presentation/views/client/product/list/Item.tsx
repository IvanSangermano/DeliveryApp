import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from '../../../../../Domain/entities/Product';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import { Category } from '../../../../../Domain/entities/Category';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';

interface Props {
    product: Product,
    navigation: StackNavigationProp<ClientStackParamList, "ClientProductListScreen", undefined>
}

export const ClientProductListItem = ({product, navigation}: Props) => {

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ClientProductDetailScreen', {product: product})}
        >
            <View style={ styles.container }>
                <View style={styles.info}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.price}>{product.price}$</Text>
                </View>
                <Image
                    source={{uri: product.image1}}
                    style={styles.image}
                />
            </View>
            <View style={styles.divider}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        height: 100,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10
    },
    info: {
        marginLeft: 15,
        flex: 1
    },
    title: {
        color: 'black',
        fontSize: 15
    },
    description: {
        color: 'gray',
        fontSize: 12,
        marginTop: 2
    },
    price: {
        color: 'green',
        fontSize: 12,
        fontWeight: 'bold'
    },  
    divider: {
        height: 3,
        backgroundColor: '#E8E8E8',
        flex: 1,
        marginHorizontal: 15
    },
})
