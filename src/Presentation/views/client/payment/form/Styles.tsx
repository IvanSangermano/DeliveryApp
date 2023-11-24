import { StyleSheet } from 'react-native';


const ClientPaymentFormStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
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