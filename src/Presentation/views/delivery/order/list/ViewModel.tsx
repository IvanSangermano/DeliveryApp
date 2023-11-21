import React, { useState, useContext, useEffect } from 'react'
import { GetByStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByStatusOrder'
import { Order } from '../../../../../Domain/entities/Order';
import { OrderContext } from '../../../../context/OrderContext';
import { UserContext } from '../../../../context/UserContext';

const DeliveryOrderListViewModel = () => {

    //const [orders, setOrders] = useState<Order[]>([])
    const {ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrdersByDeliveryAndStatus} = useContext(OrderContext)
    const { user } = useContext(UserContext)

    const getOrders = async (id_delivery:string, status: string) => {
      const result = await getOrdersByDeliveryAndStatus(id_delivery, status)
      //setOrders(result)
    }

  return {
    user,
    ordersPayed,
    ordersDispatched,
    ordersOnTheWay,
    ordersDelivery,
    getOrders
  }
}

export default DeliveryOrderListViewModel

