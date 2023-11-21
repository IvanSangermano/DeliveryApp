import { OrderRespositoryImpl } from "../../../Data/repositories/OrderRespository";

const { getByClientAndStatus } = new OrderRespositoryImpl()

export const GetByClientAndStatusOrderUseCase = async (id_client: string, status: string) => {
  return await getByClientAndStatus(id_client, status)
}
