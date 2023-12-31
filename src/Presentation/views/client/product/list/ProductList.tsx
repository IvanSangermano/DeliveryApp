import React, { useEffect } from 'react'
import { FlatList, Text, View } from 'react-native'
import useViewModel from './ViewModel'
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { ClientProductListItem } from './Item'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientProductListScreen'>{}

export const ClientProductListScreen = ({navigation, route}: Props) => {
    const {id} = route.params.category
    const {products, getProducts} = useViewModel()

    useEffect(() => {
        getProducts(id!)
    },[])

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <FlatList
            data={ products }
            keyExtractor={ (item) => item.id!}
            renderItem={ ({item}) => <ClientProductListItem product={item} navigation={navigation}/>}
        />
    </View>
  )
}
