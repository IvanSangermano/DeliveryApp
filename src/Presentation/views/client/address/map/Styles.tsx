import { StyleSheet } from 'react-native';

const ClientAddressMapStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLocation: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        position: 'absolute'
    },
    refPoint: {
        top: 40,
        position: 'absolute',
        backgroundColor: '#D4D4D4',
        width: '70%',
        paddingVertical: 4,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    refPointText: {
        textAlign: 'center'
    },
    buttonRefPoint: {
        position: 'absolute',
        bottom: 40,
        width: '70%'
    }
})
export default ClientAddressMapStyles