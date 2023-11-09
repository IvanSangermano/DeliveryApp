import React, { useEffect } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native';
import useViewModel from './ViewModel'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';

export const ProfileInfoScreen = () => {

    const navigation  = useNavigation<StackNavigationProp<RootStackParamList>>()
    const { user, removeUserSession } = useViewModel();

    useEffect(() => {
        if(user.id === ''){
            navigation.replace('HomeScreen')
        }
    }, [user])

    return (
        <View style={ styles.container }>

            <Image 
                source={require('../../../../../assets/city.jpg')} 
                style={styles.imageBackgound}
            />   
            <TouchableOpacity
                style={styles.logout}
                onPress={() => {
                    removeUserSession()
                }}>
                <Image 
                    source={require('../../../../../assets/logout.png')} 
                    style={styles.imageLogout}
                />
            </TouchableOpacity>  
   
            <View style={styles.logoContainer}>
                { user?.image !== '' &&
                    <Image
                        source={ {uri: user?.image} }
                        style={styles.logoImage}
                    />
                }
            </View>

            <View style={styles.form}>
                <View style={styles.formInfo}>
                    <Image 
                        source={require('../../../../../assets/user.png')}
                        style={styles.formImage}
                    />
                    <View style= { styles.formContent }>
                        <Text>{user?.name} {user?.lastname}</Text>
                        <Text style={ styles.fromTextDescription }>Nombre del Usuario</Text>
                    </View>
                </View>
                <View style={styles.formInfo}>
                    <Image 
                        source={require('../../../../../assets/email.png')}
                        style={styles.formImage}
                    />
                    <View style= { styles.formContent }>
                        <Text>{user?.email}</Text>
                        <Text style={ styles.fromTextDescription }>Correo Electronico</Text>
                    </View>
                </View>
                <View style={{...styles.formInfo, marginBottom: 40}}>
                    <Image 
                        source={require('../../../../../assets/phone.png')}
                        style={styles.formImage}
                    />
                    <View style= { styles.formContent }>
                        <Text>{user?.phone}</Text>
                        <Text style={ styles.fromTextDescription }>Telefono</Text>
                    </View>
                </View>

                <RoundedButton
                    onPress={() => {
                        navigation.navigate('ProfileUpdateScreen', {user: user!})
                    }}
                    text='ACTUALIZAR INFORMACIÓN'
                />
            </View>

        </View>
    )
}
