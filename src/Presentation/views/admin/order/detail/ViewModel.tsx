import React, { useContext, useEffect, useState } from 'react'
import { Order } from '../../../../../Domain/entities/Order'
import { GetDeliveryMenUseCase } from '../../../../../Domain/useCases/user/GetDeliveryMen'
import { User } from '../../../../../Domain/entities/User'
import { OrderContext } from '../../../../context/OrderContext'

interface DropDownProps {
    label: string,
    value: string
}
const AdminOrderDetailViewModel = (order: Order) => {

    const [total, setTotal] = useState(0.0)
    const [deliveryMen, setDeliveryMen] = useState<User[]>([])
    const [responseMessage, setResponseMessage] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<DropDownProps[]>([]);
    
    const {updateToDispatched} = useContext(OrderContext)

    useEffect(() => {
        setDropDownItems()
    }, [deliveryMen])

    const dispatchOrder = async () => {
        if(value !== null) {
            order.id_delivery = value!
            const result = await updateToDispatched(order)
            setResponseMessage(result.message)
        } else {
            setResponseMessage('Selecciona el repartidor')
        }
    }

    const setDropDownItems = () => {
        let itemsDeliveryMen: DropDownProps[] = []
        deliveryMen.forEach(delivery => {
            itemsDeliveryMen.push({
                label: delivery.name + ' ' + delivery.lastname,
                value: delivery.id!
            })
        })
        setItems(itemsDeliveryMen)
    }

    const getDeliveryMen = async () => {
        const result = await GetDeliveryMenUseCase()
        setDeliveryMen(result)
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
    open,
    value,
    items,
    responseMessage,
    setOpen,
    setValue,
    setItems,
    getTotal,
    dispatchOrder,
    getDeliveryMen
  }
}

export default AdminOrderDetailViewModel
