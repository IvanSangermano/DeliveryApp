import { CategoryRespositoryImpl } from "../../../Data/repositories/CategoryRepository";

const { getAll } = new CategoryRespositoryImpl

export const GetAllCategoryUseCase = async () => {
    return await getAll();
}