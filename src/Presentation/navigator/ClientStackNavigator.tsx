import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ClientCategoryListScreen } from "../views/client/category/list/CategoryList";
import { ClientProductListScreen } from "../views/client/product/list/ProductList";
import { ClientProductDetailScreen } from "../views/client/product/detail/ProductDetail";
import { Product } from "../../Domain/entities/Product";

export type ClientStackParamList = {
    ClientCategoryListScreen: undefined,
    ClientProductListScreen: {idCategory: string},
    ClientProductDetailScreen: {product: Product}
}

const Stack = createNativeStackNavigator<ClientStackParamList>()

export const ClientStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name='ClientCategoryListScreen'
                component={ClientCategoryListScreen}
                options={{
                    title: 'Categorias',
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='ClientProductListScreen'
                component={ClientProductListScreen}
                options={{
                    headerShown: true,
                    title: 'Productos'
                }}
            />
            <Stack.Screen
                name='ClientProductDetailScreen'
                component={ClientProductDetailScreen}
            />
        </Stack.Navigator>
    )
}