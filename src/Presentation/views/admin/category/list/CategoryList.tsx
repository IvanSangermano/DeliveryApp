import React, {useEffect, useState} from 'react'
import { View, FlatList, Text, ToastAndroid } from 'react-native';
import useViewModel from './ViewModel'
import { AdminCategoryListItem } from './Item';
import { ModalConfirmDelete } from '../../../../components/ModalConfirmDelete';

export const AdminCategoryListScreen = () => {

  const {categories, itemRemove, responseMessage, setItemRemove, deleteCategory} = useViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [textDelete, setTextDelete] = useState('');
  
  useEffect(() => {
    if(responseMessage !== ''){
      ToastAndroid.show(responseMessage, ToastAndroid.LONG)
    }
  }, [])

  return (
    <>
      <View style={{paddingTop: 5, backgroundColor:'white'}}>
          {categories.length > 0 ? 
          <FlatList
            data = {categories}
            keyExtractor={(item) => item.id!}
            renderItem={ ({item}) => 
              <AdminCategoryListItem 
                category={item} 
                setModal={setModalVisible} 
                setText={setTextDelete} 
                setItemRemove={setItemRemove}
              />}
          />
          :
          <Text style={{textAlign: 'center', padding: 15, fontSize: 15, fontWeight: 'bold'}}>
            No hay categorias disponibles
          </Text>
          }
      </View>
      <ModalConfirmDelete
        remove={() => {deleteCategory(itemRemove)}}
        cancel={() => {setItemRemove('')}}
        textDelete={textDelete}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible}
      />
    </>
  )
}
