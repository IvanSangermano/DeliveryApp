import { UserRespositoryImpl } from "../../../Data/repositories/UserRespository";
import { User } from "../../entities/User";

const {update} = new UserRespositoryImpl()

export const UpdateUserUseCase = async(user: User) => {
    return await update(user);
}

