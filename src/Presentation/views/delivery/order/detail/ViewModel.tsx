import React, { useContext, useEffect, useState } from 'react'
import { Order } from '../../../../../Domain/entities/Order'
import { User } from '../../../../../Domain/entities/User'
import { OrderContext } from '../../../../context/OrderContext'
import { UserContext } from '../../../../context/UserContext'

const DeliveryOrderDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0.0)
    const [deliveryMen, setDeliveryMen] = useState<User[]>([])
    const [responseMessage, setResponseMessage] = useState('')
    const {updateToOnTheWay} = useContext(OrderContext)
    const {user} = useContext(UserContext)

    const updateToOnTheWayOrder = async () => {
        order.id_delivery = user.id
        const result = await updateToOnTheWay(order)
        setResponseMessage(result.message)
    }

    const getTotal = () => {
        let total = 0.0
        order.products.forEach(p => {
            total = total + (p.price * p.quantity!)
        })
        setTotal(total)
    }

  return {
    total,
    deliveryMen,
    responseMessage,
    getTotal,
    updateToOnTheWayOrder,
  }
}

export default DeliveryOrderDetailViewModel
