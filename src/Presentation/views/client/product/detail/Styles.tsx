import { StyleSheet } from "react-native";

const ClientProductDetailStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    back: {
        position: "absolute",
        top: 30,
        left: 15,
    },
    backImage: {
        width: 40,
        height: 40
    },
    productImage: {
        width: '100%',
        height: '45%'
    },
    productInfo: {
        flex: 1,
        padding: 30
    },
    productDetail: {
        position: "absolute",
        width: '100%',
        height: '60%',
        backgroundColor: 'white',
        bottom: 0,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    divider: {
        height: 1,
        backgroundColor: '#E8E8E8',
        marginTop: 15
    },
    name: {
        fontWeight: "bold",
        fontSize: 18
    },
    descriptionTitle: {
        marginTop: 10,
        fontWeight: "bold"
    }, 
    descriptionContent: {
        fontSize: 13,
        marginTop: 5
    },
    productActions: {
        flexDirection: "row",
        height: 70,
        backgroundColor: '#E8E8E8',
        paddingHorizontal: 30
    },
    actionLess: {
        backgroundColor: '#3A3A3A',
        height: 50,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    actionAdd: {
        backgroundColor: '#3A3A3A',
        height: 50,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    quantity: {
        backgroundColor: '#3A3A3A',
        height: 50,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    actionText: {
        color: 'white',
        fontSize: 15
    },
    buttonAdd: {
        flex: 1,
        marginLeft: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ClientProductDetailStyles