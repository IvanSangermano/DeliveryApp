import React, { useEffect } from 'react'
import { View, Text, useWindowDimensions, FlatList } from 'react-native';
import useViewModel from './ViewModel'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { OrderListItem } from './Item';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator';

interface Props {
    status: string
}

const OrderListView = ({status}: Props) => {

    const { user, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrders } = useViewModel()
    const navigation = useNavigation<StackNavigationProp<DeliveryOrderStackParamList, 'DeliveryOrderListScreen'>>()

    useEffect(() => {
        if(user.id != null && user.id != undefined && user.id != "") {
            getOrders(user?.id!, status)
        }
      }, [user])

    return (
        <View>
            <FlatList
                data={ 
                    status === 'DESPACHADO' ? ordersDispatched
                    : status === 'EN CAMINO' ? ordersOnTheWay 
                    : status === 'ENTREGADO' ? ordersDelivery
                    : []
                 }
                keyExtractor={ (item) => item.id!}
                renderItem={ ({item}) => <OrderListItem order={item} navigation={navigation}/>}
            />
        </View>
    )
}

export const DeliveryOrderListScreen = () => {
    const layout = useWindowDimensions();
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'DESPACHADO' },
        { key: 'second', title: 'EN CAMINO' },
        { key: 'third', title: 'ENTREGADO' },
    ]);
  
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
            <TabBar
                {...props}
                indicatorStyle={{backgroundColor: '#e2e2e2'}}  
                activeColor='black'
                inactiveColor='gray'
                scrollEnabled={true}
                style={{backgroundColor: 'white', height: 60, paddingTop: 15, justifyContent: 'center'}}
            />
        )}
      />
    );
}

const renderScene = ({ route } : any) => {
    switch (route.key) {
        case 'first':
            return <OrderListView status='DESPACHADO' />;
        case 'second':
            return <OrderListView status='EN CAMINO' />;
        case 'third':
            return <OrderListView status='ENTREGADO' />;
        default:
            return <OrderListView status='DESPACHADO' />;
    }
  };

