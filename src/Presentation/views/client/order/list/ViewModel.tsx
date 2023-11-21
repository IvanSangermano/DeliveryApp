import React, { useState, useContext, useEffect } from 'react'
import { GetByStatusOrderUseCase } from '../../../../../Domain/useCases/order/GetByStatusOrder'
import { Order } from '../../../../../Domain/entities/Order';
import { OrderContext } from '../../../../context/OrderContext';
import { UserContext } from '../../../../context/UserContext';

const ClientOrderListViewModel = () => {

    //const [orders, setOrders] = useState<Order[]>([])
    const {ordersPayed, ordersDispatched, ordersOnTheWay, ordersDelivery, getOrdersByClientAndStatus} = useContext(OrderContext)
    const { user } = useContext(UserContext)

    const getOrders = async (id_client: string, status: string) => {
      const result = await getOrdersByClientAndStatus(id_client, status)
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

export default ClientOrderListViewModel

