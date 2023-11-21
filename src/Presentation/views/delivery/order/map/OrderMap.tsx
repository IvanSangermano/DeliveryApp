import React, {useEffect} from 'react'
import { View, ToastAndroid, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Styles'
import useViewModel from './ViewModel'
import { RoundedButton } from '../../../../components/RoundedButton';
import stylesmap from './StylesMap'
import { StackScreenProps } from '@react-navigation/stack';
import { DeliveryOrderStackParamList } from '../../../../navigator/DeliveryOrderStackNavigator';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../../../../contants/GoogleMapApiKey';

interface Props extends StackScreenProps<DeliveryOrderStackParamList, 'DeliveryOrderMapScreen'> {}

export const DeliveryOrderMapScreen = ({navigation, route}: Props) => {
  const { order } = route.params
  const {messagePermissions, responseMessage ,position, mapRef, origin, destination, socket, stopForegroundUpdate, updateToDeliveredOrder} = useViewModel(order)

  useEffect(() => {
    if(messagePermissions != ''){
      ToastAndroid.show(messagePermissions, ToastAndroid.LONG)
    }
  }, [messagePermissions])
  
  useEffect(() => {
    if(responseMessage != ''){
      ToastAndroid.show(responseMessage, ToastAndroid.LONG)
    }
  }, [responseMessage])

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      stopForegroundUpdate()
      socket.disconnect()
    })
    return unsubscribe //Function to destroy the gps subscription
  }, [navigation])
  

  return (
    <View style={styles.container}>
      <MapView
          ref={ mapRef }
          customMapStyle={stylesmap}
          zoomControlEnabled={true}
          style={{ height: '64%', width: '100%', position: 'absolute', top:0}}
          provider={PROVIDER_GOOGLE}
      >
        {
          position !== undefined &&
          <Marker
            coordinate={position}
          >
            <Image
              style={styles.markerImage}
              source={require('../../../../../../assets/delivery.png')}
            />
          </Marker>
        }
        {
          order.address !== undefined &&
          <Marker
            coordinate={{latitude: order.address.lat, longitude: order.address.lng}}
          >
            <Image
              style={styles.markerImage}
              source={require('../../../../../../assets/home.png')}
            />
          </Marker>
        }
        {
          origin.latitude !== 0.0 &&
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="orange"
          />
        }
      </MapView>

      <View style={styles.info}>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Barrio</Text>
            <Text style={styles.infoDescription}>{order.address?.neighborhood}</Text>
          </View>
          <Image
            source={require('../../../../../../assets/location.png')}
            style={styles.infoImage}
          />
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoText}>
            <Text style={styles.infoTitle}>Direccion</Text>
            <Text style={styles.infoDescription}>{order.address?.address}</Text>
          </View>
          <Image
            source={require('../../../../../../assets/location_home.png')}
            style={styles.infoImage}
          />
        </View>

        <View style={styles.divider}></View>

        <View style={styles.infoClient}>
          <Image
            style={styles.imageClient}
            source={{uri: order.client?.image}}
          />
          <Text  style={styles.clientName}>{order.client?.name} {order.client?.lastname}</Text>
          <Image
            style={styles.imagePhone}
            source={require('../../../../../../assets/phone.png')}
          />
        </View>

        <View style={styles.buttonRefPoint}>
          <RoundedButton
            text='ENTREGAR PEDIDO'
            onPress={() => updateToDeliveredOrder()}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
        <Image
          style={styles.back}
          source={require('../../../../../../assets/back.png')}
        />
      </TouchableOpacity>
    </View>
  )
}
