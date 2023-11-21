import { AxiosError } from "axios";
import { Order } from "../../Domain/entities/Order";
import { OrderRespository } from "../../Domain/repositories/OrderRepository";
import { ResponseAPIDelivery } from "../sources/remote/models/ResponseApiDelivery";
import { ApiDelivery } from "../sources/remote/api/ApiDelivery";

export class OrderRespositoryImpl implements OrderRespository {
    
    async getByDeliveryAndStatus(id_delivery: string, status: string): Promise<Order[]> {
        try {

            const response = await ApiDelivery.get<Order[]>(`/orders/findByDeliveryAndStatus/${id_delivery}/${status}`)
            return Promise.resolve(response.data)
            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data))
            return Promise.resolve([])
        }
    }

    async getByClientAndStatus(id_client: string, status: string): Promise<Order[]> {
        try {

            const response = await ApiDelivery.get<Order[]>(`/orders/findByClientAndStatus/${id_client}/${status}`)
            return Promise.resolve(response.data)
            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data))
            return Promise.resolve([])
        }
    }

    async getByStatus(status: string): Promise<Order[]> {
        try {

            const response = await ApiDelivery.get<Order[]>(`/orders/findByStatus/${status}`)
            return Promise.resolve(response.data)
            
        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data))
            return Promise.resolve([])
        }
    }

    async create(order: Order): Promise<ResponseAPIDelivery> {
        try {
            
            const response = await ApiDelivery.post<ResponseAPIDelivery>('/orders/create', order)
            return response.data

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data))
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }
    }

    async updateToDispatched(order: Order): Promise<ResponseAPIDelivery> {
        try {
            
            const response = await ApiDelivery.put<ResponseAPIDelivery>('/orders/updateToDispatched', order)
            return response.data

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data))
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }
    }

    async updateToOnTheWay(order: Order): Promise<ResponseAPIDelivery> {
        try {
            
            const response = await ApiDelivery.put<ResponseAPIDelivery>('/orders/updateToOnTheWay', order)
            return response.data

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data))
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }
    }
    
    async updateToDelivered(order: Order): Promise<ResponseAPIDelivery> {
        try {
            
            const response = await ApiDelivery.put<ResponseAPIDelivery>('/orders/updateToDelivered', order)
            return response.data

        } catch (error) {
            let e = (error as AxiosError);
            console.log('ERROR: ', JSON.stringify(e.response?.data))
            const apiError:ResponseAPIDelivery = JSON.parse(JSON.stringify(e.response?.data));
            return Promise.resolve(apiError)
        }
    }
}