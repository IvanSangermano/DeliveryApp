import { createContext, useEffect, useState } from "react";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Order } from "../../Domain/entities/Order";
import { GetByStatusOrderUseCase } from "../../Domain/useCases/order/GetByStatusOrder";
import { UpdateToDispatchedOrderUseCase } from "../../Domain/useCases/order/UpdateToDispatchedOrder";
import { GetByDeliveryAndStatusOrderUseCase } from "../../Domain/useCases/order/GetByDeliveryAndStatusOrder";
import { UpdateToOnTheWayOrderUseCase } from "../../Domain/useCases/order/UpdateToOnTheWayOrder";
import { UpdateToDeliveredOrderUseCase } from "../../Domain/useCases/order/UpdateToDeliveredOrder";
import { GetByClientAndStatusOrderUseCase } from "../../Domain/useCases/order/GetByClientAndStatusOrder";

export interface OrderContextProps {
    ordersPayed: Order[],
    ordersDispatched: Order[],
    ordersOnTheWay: Order[],
    ordersDelivery: Order[],
    getOrdersByStatus(status: string): Promise<void>,
    getOrdersByDeliveryAndStatus(id_delivery: string, status: string): Promise<void>,
    getOrdersByClientAndStatus(id_client: string, status: string): Promise<void>,
    updateToDispatched(order: Order): Promise<ResponseAPIDelivery>,
    updateToOnTheWay(order: Order): Promise<ResponseAPIDelivery>,
    updateToDelivered(order: Order): Promise<ResponseAPIDelivery>,
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({children}: any) => {
    const [ordersPayed, setordersPayed] = useState<Order[]>([]);
    const [ordersDispatched, setOrdersDispatched] = useState<Order[]>([]);
    const [ordersOnTheWay, setOrdersOrdersOnTheWay] = useState<Order[]>([]);
    const [ordersDelivery, setOrdersDelivery] = useState<Order[]>([]);

    useEffect(() => {
        setordersPayed([])
        setOrdersDispatched([])
        setOrdersOrdersOnTheWay([])
        setOrdersDelivery([])
    }, []);

    const getOrdersByStatus = async (status: string) => {
        const result = await GetByStatusOrderUseCase(status);
        if (status === "PAGADO"){
            setordersPayed(result);
        } else if (status === "DESPACHADO"){
            setOrdersDispatched(result);
        } else if (status === "EN CAMINO"){
            setOrdersOrdersOnTheWay(result);
        } else if (status === "ENTREGADO"){
            setOrdersDelivery(result);
        }
    };

    const getOrdersByDeliveryAndStatus = async (id_delivery: string, status: string) => {
        const result = await GetByDeliveryAndStatusOrderUseCase(id_delivery, status);
        if (status === "PAGADO"){
            setordersPayed(result);
        } else if (status === "DESPACHADO"){
            setOrdersDispatched(result);
        } else if (status === "EN CAMINO"){
            setOrdersOrdersOnTheWay(result);
        } else if (status === "ENTREGADO"){
            setOrdersDelivery(result);
        }
    };

    const getOrdersByClientAndStatus = async (id_client: string, status: string) => {
        const result = await GetByClientAndStatusOrderUseCase(id_client, status);
        if (status === "PAGADO"){
            setordersPayed(result);
        } else if (status === "DESPACHADO"){
            setOrdersDispatched(result);
        } else if (status === "EN CAMINO"){
            setOrdersOrdersOnTheWay(result);
        } else if (status === "ENTREGADO"){
            setOrdersDelivery(result);
        }
    };

    const updateToDispatched = async (order: Order) => {
        const result = await UpdateToDispatchedOrderUseCase(order);
        getOrdersByStatus('PAGADO');
        getOrdersByStatus('DESPACHADO');
        return result;
    };

    const updateToOnTheWay = async (order: Order) => {
        const result = await UpdateToOnTheWayOrderUseCase(order);
        getOrdersByDeliveryAndStatus(order.id_delivery!, 'DESPACHADO');
        getOrdersByDeliveryAndStatus(order.id_delivery!, 'EN CAMINO');
        return result;
    };

    const updateToDelivered = async (order: Order) => {
        const result = await UpdateToDeliveredOrderUseCase(order);
        getOrdersByDeliveryAndStatus(order.id_delivery!, 'EN CAMINO');
        getOrdersByDeliveryAndStatus(order.id_delivery!, 'ENTREGADO');
        return result;
    };

    return(
        <OrderContext.Provider
            value={{
                ordersPayed,
                ordersDispatched,
                ordersOnTheWay,
                ordersDelivery,
                getOrdersByStatus,
                getOrdersByDeliveryAndStatus,
                getOrdersByClientAndStatus,
                updateToDispatched,
                updateToOnTheWay,
                updateToDelivered
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};