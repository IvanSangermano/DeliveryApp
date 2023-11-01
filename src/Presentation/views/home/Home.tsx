import React, { useState } from 'react'
import { View, Image, Text, TextInput, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { RoundedButton } from '../../../Presentation/components/RoundedButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../../App';
import useViewModel from './ViewModel';
import { CustomTextInput } from '../../components/CustomTextInput';
import styles from './Styles'

export const HomeScreen = () => {

  const { email, password, onChange} = useViewModel();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../assets/chef.jpg')} 
        style={styles.imageBackgound}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>FOOD APP</Text>
      </View>

      <View style={styles.form}>

        <Text style={styles.formText}>INGRESAR</Text>

        <CustomTextInput
          image={require('../../../../assets/email.png')}
          placeholder='Correo Electronico'
          keyboardType='email-address'
          property='email'
          onChangeText={ onChange }
          value={email}
        />
        
        <CustomTextInput
          image={require('../../../../assets/password.png')}
          placeholder='Contraseña'
          keyboardType='default'
          property='password'
          onChangeText={ onChange }
          value={ password }
          secureTextEntry={ true }
        />
        
        <View style={{marginTop: 30}}>
          <RoundedButton text='LOGIN' onPress={() => {
            console.log('email', email)
            console.log('password', password)
          }} />
        </View>
        
        <View style={styles.formRegister}>
          <Text>No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.formRegisterText}>Registrate</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}
