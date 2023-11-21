import { StyleSheet } from 'react-native';

const DeliveryOrderMapStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    markerImage:{
        height: 50,
        width: 50
    },
    info: {
        backgroundColor: 'white',
        height: '37%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    infoRow: {
        flexDirection: "row",
        marginTop: 15
    },
    infoText: {
        flex: 1
    },
    infoTitle:{
        color: 'black'
    },
    infoDescription: {
        color: 'gray',
        fontSize: 13,
        marginTop: 3
    },
    infoImage: {
        width: 25,
        height: 25
    },
    divider: {
        backgroundColor: '#e8e8e8',
        height: 1,
        width: '100%',
        marginTop:  15,
    },
    infoClient: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    imageClient: {
        width: 50,
        height: 50,
        borderRadius: 15,
    },
    clientName:{
        fontWeight: 'bold',
        fontSize: 17,
        marginLeft: 15,
        flex: 1
    },
    imagePhone: {
        width: 35,
        height: 35,
        borderRadius: 15,
    },
    buttonRefPoint: {
        marginTop: 15,
        width: '100%',
    },
    backContainer: {
        position: 'absolute',
        top: 50,
        left: 20
    },
    back: {
        height: 30,
        width: 30
    }
})
export default DeliveryOrderMapStyles