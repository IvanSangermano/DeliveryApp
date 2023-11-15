import React from 'react'
import { Category } from '../../../../../Domain/entities/Category'
import { View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryStackParamList } from '../../../../navigator/AdminCategoryNavigator';

interface Props {
    category: Category,
    remove: (id: string) => void
}

export const AdminCategoryListItem = ({category, remove}: Props) => {

    const navigation = useNavigation<StackNavigationProp<CategoryStackParamList>>()

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('AdminProductNavigator', {category: category})}
        >
            <View style={ styles.container }>
                <Image
                    source={{uri: category.image}}
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{category.name}</Text>
                    <Text style={styles.description}>{category.description}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AdminCategoryUpdateScreen', {category})
                        }}
                    >
                        <Image
                            style={styles.actionImage}
                            source={ require('../../../../../../assets/edit.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => remove(category.id!)}
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
        height: 70,
        marginHorizontal: 20,
        marginTop: 10
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
    }
})
