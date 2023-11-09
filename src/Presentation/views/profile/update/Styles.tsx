import { StyleSheet } from 'react-native';

const ProfileUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackgound: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
        bottom: '30%'
    },
    form: {
        width: '100%',
        height: '55%',
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
        top: '10%'
    },
    logoImage: {
        width:100,
        height:100,
        borderRadius: 15,
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
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    }
});

export default ProfileUpdateStyles