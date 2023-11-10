import { CategoryRespositoryImpl } from "../../../Data/repositories/CategoryRepository";

const { remove } = new CategoryRespositoryImpl

export const DeleteCategoryUseCase = async (id: string) => {
    return await remove(id);
}