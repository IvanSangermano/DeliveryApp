import { StyleSheet } from 'react-native';
import { MyColors } from '../../../../theme/AppTheme';

const AdminCategoryCreateStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MyColors.background,
    },
    form: {
        width: '100%',
        height: '65%',
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
        alignSelf: 'center',
        alignItems: 'center',
        top: '7%'
    },
    logoImage: {
        width:180,
        height:180,
        borderRadius: 50
    },
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    }
});

export default AdminCategoryCreateStyles