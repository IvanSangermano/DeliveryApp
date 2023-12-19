import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { View, FlatList, ToastAndroid } from 'react-native';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import useViewModel from './ViewModel'
import { AdminProductListItem } from './Item';
import { ModalConfirmDelete } from '../../../../components/ModalConfirmDelete';

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductListScreen'>{}

export const AdminProductListScreen = ({navigation, route}: Props) => {

    const { category } = route.params
    const {products, itemRemove, responseMessage, getProducts, clearItem, setItemRemove, deleteProduct} = useViewModel(category)

    const [modalVisible, setModalVisible] = useState(false);
    const [textDelete, setTextDelete] = useState('');
    
    useEffect(() => {
        if(category.id !== undefined){
            getProducts(category.id!)
        }
    }, [])

    useEffect(() => {
        if(responseMessage != ''){
            ToastAndroid.show(responseMessage, ToastAndroid.LONG)
        }
    }, [responseMessage])

    return (
        <>
            <View style={{backgroundColor: 'white'}}>
                <FlatList
                    data={ products }
                    keyExtractor={(item) => item.id!}
                    renderItem={ ({item})=> 
                    <AdminProductListItem 
                        product={item} 
                        category={category}
                        setModal={setModalVisible} 
                        setText={setTextDelete} 
                        setItemRemove={setItemRemove}
                    />}
                />
            </View>
            <ModalConfirmDelete
                remove={() => {deleteProduct(itemRemove)}}
                cancel={() => {clearItem()}}
                textDelete={textDelete}
                modalUseState={modalVisible}
                setModalUseState={setModalVisible}
            />
        </>
    )
}
