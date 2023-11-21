import { OrderRespositoryImpl } from "../../../Data/repositories/OrderRespository";
import { Order } from "../../entities/Order";

const { updateToDispatched } = new OrderRespositoryImpl()

export const UpdateToDispatchedOrderUseCase = async (order: Order) => {
  return await updateToDispatched(order)
}
