import { OrderRespositoryImpl } from "../../../Data/repositories/OrderRespository";

const { getByDeliveryAndStatus } = new OrderRespositoryImpl()

export const GetByDeliveryAndStatusOrderUseCase = async (id_delivery: string, status: string) => {
  return await getByDeliveryAndStatus(id_delivery, status)
}
