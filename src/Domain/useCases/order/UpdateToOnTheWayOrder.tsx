import { OrderRespositoryImpl } from "../../../Data/repositories/OrderRespository";
import { Order } from "../../entities/Order";

const { updateToOnTheWay } = new OrderRespositoryImpl()

export const UpdateToOnTheWayOrderUseCase = async (order: Order) => {
  return await updateToOnTheWay(order)
}
