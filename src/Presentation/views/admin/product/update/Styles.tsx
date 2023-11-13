import { StyleSheet } from 'react-native';
import { MyColors } from '../../../../theme/AppTheme';

const AdminProductUpdateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.background,
    },
    form: {
        width: '100%',
        height: '70%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        paddingBottom: 25
    },
    logoContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        top: '7%'
    },
    logoImage: {
        width:110,
        height:110,
        borderRadius: 25,
        margin: 5
    },
    categoryInfo:{
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageCategory: {
        width: 50,
        height: 50,
    },
    textCategory: {
        color: 'gray',
        fontSize: 17,
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

export default AdminProductUpdateStyles