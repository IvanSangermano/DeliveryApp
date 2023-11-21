import { OrderRespositoryImpl } from "../../../Data/repositories/OrderRespository";
import { Order } from "../../entities/Order";

const { updateToDelivered } = new OrderRespositoryImpl()

export const UpdateToDeliveredOrderUseCase = async (order: Order) => {
  return await updateToDelivered(order)
}
