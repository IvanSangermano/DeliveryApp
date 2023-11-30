import * as Location from 'expo-location'
import React, {useEffect, useRef, useState} from 'react'
import MapView, { Camera } from 'react-native-maps'
import { Order } from '../../../../../Domain/entities/Order'
import socket from '../../../../utils/SocketIO'

const ClientOrderMapViewModel = (order: Order) => {
    const [messagePermissions, setMessagePermissions] = useState('')
    const [responseMessage, setResponseMessages] = useState('')

    const [origin, setOrigin] = useState({
        latitude: order.address?.lat!,
        longitude: order.address?.lng!
    })
    const [position, setPosition] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    const [positionOnce, setPositionOnce] = useState({
        latitude: 0.0,
        longitude: 0.0
    })
    const mapRef = useRef<MapView | null>(null)

    useEffect(() => {
        socket.connect()
        socket.on('connect', () => {
            console.log("-------- SOCKET IO CONNECTION CLIENT-------")
        })
        socket.on(`position/${order.id!}`, (data) => {
            setPosition({latitude: data.lat, longitude: data.lng})
        })

        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()   //Await permissions request
            if(foreground.granted) { //accept permissions
                startForegroundUpdate()
            }
        }

        requestPermissions();
    }, [])

    useEffect(() => {
        if(position.latitude != 0.0 && position.longitude != 0.0){
            if(positionOnce.latitude === 0.0 && positionOnce.longitude === 0.0) {
                setPositionOnce(position)
            }
        }
    }, [position])
    
    const startForegroundUpdate = async () => {
        const { granted } = await Location.getForegroundPermissionsAsync() //Location Permissions
    
        if (!granted){
            setMessagePermissions('Permiso de ubicacion denegado')
            return
        }

        const location = await Location.getLastKnownPositionAsync() //Location when opening the map
        const newCamera: Camera = {
            center: {latitude: location?.coords.latitude!, longitude: location?.coords.longitude!},
            zoom: 15,
            heading: 0,
            pitch: 0,
            altitude: 0
        }
        mapRef.current?.animateCamera(newCamera, { duration: 1000 }) //Duration when opening the map until reaching the location

    }

    return {
        responseMessage,
        messagePermissions,
        position,
        mapRef,
        origin,
        socket,
        positionOnce
    }
}

export default ClientOrderMapViewModel
