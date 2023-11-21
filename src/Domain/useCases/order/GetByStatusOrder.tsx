import { OrderRespositoryImpl } from "../../../Data/repositories/OrderRespository";

const { getByStatus } = new OrderRespositoryImpl()

export const GetByStatusOrderUseCase = async (status: string) => {
  return await getByStatus(status)
}
