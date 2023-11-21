import { OrderRespositoryImpl } from "../../../Data/repositories/OrderRespository";
import { Order } from "../../entities/Order";

const { create } = new OrderRespositoryImpl()

export const CreateOrderUseCase = async (order: Order) => {
  return await create(order)
}
