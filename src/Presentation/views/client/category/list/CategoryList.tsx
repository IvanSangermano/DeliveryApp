import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native';
import { ClientStackParamList } from '../../../../navigator/ClientStackNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import { ClientCategoryItem } from './Item';
import useViewModel from './ViewModel'

interface Props extends StackScreenProps<ClientStackParamList, 'ClientCategoryListScreen'>{}

export const ClientCategoryListScreen = ({navigation, route}: Props) => {
    const { categories, getCategories } = useViewModel()
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height

    const [mode, setMode] = useState<any>('horizontal-stack')
    const [snapDirection, setSnapDirection] = useState<'left' | 'right'>('left')

    useEffect(()=> {
        getCategories()
    }, [])

    return (
        <GestureHandlerRootView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <View>
                <Carousel
                    loop={false}
                    width={width}
                    height={height - 250 }
                    autoPlay={false}
                    data={ categories }
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <ClientCategoryItem category={ item } height={ height - 300} width={ width - 100} navigation={navigation}/>
                    )}
                    modeConfig={{
                        snapDirection,
                        stackInterval: 35
                    }}
                    mode={mode}
                />
            </View>
        </GestureHandlerRootView>
    )
}
