import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from '../../../../../Domain/entities/Product';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import { Category } from '../../../../../Domain/entities/Category';

interface Props {
    product: Product,
    category: Category,
    remove: (product: Product) => void
}

export const AdminProductListItem = ({product, category, remove}: Props) => {

    const navigation = useNavigation<StackNavigationProp<ProductStackParamList>>()
    
    return (
        <TouchableOpacity
            // onPress={() => navigation.navigate('AdminProductNavigator', {category: category})}
        >
            <View style={ styles.container }>
                <Image
                    source={{uri: product.image1}}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.price}>{product.price}$</Text>
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AdminProductUpdateScreen', {category: category, product: product})}
                    >
                        <Image
                            style={styles.actionImage}
                            source={ require('../../../../../../assets/edit.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => remove(product)}
                    >
                        <Image
                            style={{...styles.actionImage, marginTop: 8}}
                            source={ require('../../../../../../assets/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
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
        marginHorizontal: 20,
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15
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
    actionContainer: {
       marginRight: 35 
    },
    actionImage: {
        width: 25,
        height: 25,
    },
    divider: {
        height: 3,
        backgroundColor: '#E8E8E8',
        flex: 1,
        marginHorizontal: 15
    },
})
