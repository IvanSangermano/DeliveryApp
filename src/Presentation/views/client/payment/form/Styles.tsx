import { StyleSheet } from 'react-native';


const ClientPaymentFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 15
    },
    scrollview:{
        width: '100%'
    },
    payments: {
        flexDirection: 'row',
    },
    paymentMP: {
        flexDirection: 'row',
        width: 175,
        height: 40,
        alignItems: 'center',
        borderWidth: 2,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    paymentSRP:{
        flexDirection: 'row',
        width: 175,
        height: 40,
        alignItems: 'center',
        borderWidth: 2,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
    },
    imagePayMP: {
        width: 45, 
        height: 32,
        marginHorizontal: 8
    },
    paymentMPText:{
        marginHorizontal: 10
    },
    paymentSRPText:{
        marginHorizontal: 10
    },
    imagePaySRP: {
        width: 50,
        height: 30,
    },
    form: {
        marginTop: 15,
    },
    dropDown: {
        marginVertical: 30,
        paddingHorizontal: 20,
        flex: 1
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    check: {
        right: 10,
        bottom: 10,
        width: 60,
        height: 60,
        alignSelf: 'flex-end'
    }
})

export default ClientPaymentFormStyles