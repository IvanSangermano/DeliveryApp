import { StyleSheet } from 'react-native';

const ClientShoppingBagStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10, 
        backgroundColor: 'white'
    },
    totalToPay: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#E8E8E8',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    totalInfo: {
        alignItems: 'center'
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 17
    },
    buttonAdd: {
        width: '55%'
    }
})

export default ClientShoppingBagStyles