import { UserRespositoryImpl } from '../../../Data/repositories/UserRespository'

const { getDeliveryMan } = new UserRespositoryImpl()

export const GetDeliveryMenUseCase = async () => {
    return await getDeliveryMan()
}
