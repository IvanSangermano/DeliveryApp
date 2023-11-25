import { StyleSheet } from "react-native";

const ProfileInfoStyles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center', 
        alignItems: 'center',
        backgroundColor: 'black'
    },
    imageBackgound: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    logout: {
        position: 'absolute',
        top: 30,
        right: 15
    },
    imageLogout: {
        width: 40,
        height: 40,
    },
    exchange: {
        backgroundColor: 'white',
        position: 'absolute',
        borderRadius: 50,
        padding:8,
        right: 15,
        top: 80,
    },
    imageExchange:{
        width: 23,
        height: 23,
    },
    form: {
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 30
    },
    formInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop:25
    },
    formContent: {
        marginLeft: 15
    },
    formText:{
        fontWeight: 'bold',
        fontSize: 16
    },
    fromTextDescription: {
        fontSize: 12,
        color: 'gray'
    },
    formImage: {
        height: 30,
        width: 30,
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '14%'
    },
    logoImage: {
        width:180,
        height:180,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2
    },
    logoText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
})

export default ProfileInfoStyles