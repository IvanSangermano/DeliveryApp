import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Order } from "../entities/Order";

export interface OrderRespository {

    getByStatus(status: string): Promise<Order[]>
    getByDeliveryAndStatus(id_delivery: string, status: string): Promise<Order[]>
    getByClientAndStatus(id_client: string, status: string): Promise<Order[]>
    create(order: Order): Promise<ResponseAPIDelivery>
    updateToDispatched(order: Order): Promise<ResponseAPIDelivery>
    updateToOnTheWay(order: Order): Promise<ResponseAPIDelivery>
    updateToDelivered(order: Order): Promise<ResponseAPIDelivery>
    
}