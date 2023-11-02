import { StyleSheet } from 'react-native';

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackgound: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    form: {
        width: '100%',
        height: '72%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30,
    },
    formText:{
        fontWeight: 'bold',
        fontSize: 16
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        top: '5%'
    },
    logoImage: {
        width:100,
        height:100,
    },
    logoText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
});

export default RegisterStyles