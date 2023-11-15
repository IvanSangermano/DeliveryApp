import * as Location from 'expo-location'
import React, {useEffect, useRef, useState} from 'react'
import MapView, { Camera } from 'react-native-maps'

const ClientAddressMapViewModel = () => {
    const [refPoint, setRefPoint] = useState({
        name: '',
        latitude: 0.0,
        longitude: 0.0
    })
    const [messagePermissions, setMessagePermissions] = useState('second')
    const [position, setPosition] = useState<Location.LocationObjectCoords>()
    const mapRef = useRef<MapView | null>(null)

    useEffect(() => {
        const requestPermissions = async () => {
            const foreground = await Location.requestForegroundPermissionsAsync()   //Await permissions request
            if(foreground.granted) { //accept permissions
                startForegroundUpdate()
            }
        }

        requestPermissions();
    }, [])
    
    const onRegionChangeComplete = async (latitude: number, longitude: number) => {
        try {
            const place = await Location.reverseGeocodeAsync({
                latitude: latitude,
                longitude: longitude
            })

            let city
            let street
            let streetNumber

            place.find(p => {
                city = p.city
                street = p.street
                streetNumber = p.streetNumber
                setRefPoint({
                    name: `${street}, ${streetNumber}, ${city}`,
                    latitude,
                    longitude
                })
            })

        } catch (error) {
            console.log(error)
        }
    }

    const startForegroundUpdate = async () => {
        const { granted } = await Location.getForegroundPermissionsAsync() //Location Permissions
    
        if (!granted){
            setMessagePermissions('Permiso de ubicacion denegado')
            return
        }

        const location = await Location.getLastKnownPositionAsync() //Location when opening the map
        setPosition(location?.coords)
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
        messagePermissions,
        position,
        mapRef,
        ...refPoint,
        onRegionChangeComplete
    }
}

export default ClientAddressMapViewModel
