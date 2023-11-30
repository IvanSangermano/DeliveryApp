import * as Location from 'expo-location'
import React, {useContext, useEffect, useRef, useState} from 'react'
import MapView, { Camera } from 'react-native-maps'
import { Order } from '../../../../../Domain/entities/Order'
import { OrderContext } from '../../../../context/OrderContext'
import socket from '../../../../utils/SocketIO'

const DeliveryOrderMapViewModel = (order: Order) => {
    const { updateToDelivered } = useContext(OrderContext)

    const [messagePermissions, setMessagePermissions] = useState('')
    const [responseMessage, setResponseMessages] = useState('')

    const [refPoint, setRefPoint] = useState({
        name: '',
        latitude: 0.0,
        longitude: 0.0
    })
    const [origin, setOrigin] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    const [destination, setDestionation] = useState({
        latitude: order.address?.lat!,
        longitude: order.address?.lng!,
    })
    
    const [position, setPosition] = useState<Location.LocationObjectCoords>()
    const mapRef = useRef<MapView | null>(null)
    let positionSuscription: Location.LocationSubscription

    useEffect(() => {
        socket.connect()
        socket.on('connect', () => {
            console.log("-------- SOCKET IO CONNECTION DELIVERY-------")
        })
        
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()   //Await permissions request
            
            if(foreground.granted) { //accept permissions
                startForegroundUpdate()
            }
        }

        requestPermissions();
    }, [])
    
    const updateToDeliveredOrder = async() => {
        const result = await updateToDelivered(order)
        setResponseMessages(result.message)
    }

    const startForegroundUpdate = async () => {
        const { granted } = await Location.getForegroundPermissionsAsync() //Location Permissions
    
        if (!granted){
            setMessagePermissions('Permiso de ubicacion denegado')
            return
        }

        const location = await Location.getLastKnownPositionAsync() //Location when opening the map
        setPosition(location?.coords)
        setOrigin({
            latitude: location?.coords.latitude!,
            longitude: location?.coords.longitude!
        })
        const newCamera: Camera = {
            center: {latitude: location?.coords.latitude!, longitude: location?.coords.longitude!},
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 0
        }
        mapRef.current?.animateCamera(newCamera, { duration: 1000 }) //Duration when opening the map until reaching the location

        positionSuscription?.remove() //remove subscriptions to avoid overloading the task thread
        positionSuscription = await Location.watchPositionAsync(
            {  //Function to obtain the location in real time, optimizing battery and mobile data
                accuracy: Location.Accuracy.Balanced
            },
                location => {
                    socket.emit('position', {
                        id_order: order.id!,
                        lat: location?.coords.latitude,
                        lng: location?.coords.longitude
                    })
                    setPosition(location?.coords) //Location setting
                    const newCamera: Camera = {
                        center: {latitude: location?.coords.latitude!, longitude: location?.coords.longitude!},
                        zoom: 16,
                        heading: 0,
                        pitch: 0,
                        altitude: 0
                    }
                    mapRef.current?.animateCamera(newCamera, { duration: 1000 })
            }
        )
    }

    const stopForegroundUpdate = () => { //Function to stop suscription of GPS
        positionSuscription?.remove()
        setPosition(undefined)
    }

    return {
        responseMessage,
        messagePermissions,
        position,
        mapRef,
        origin,
        destination,
        socket,
        stopForegroundUpdate,
        updateToDeliveredOrder
    }
}

export default DeliveryOrderMapViewModel
