import * as ImagePicker from 'expo-image-picker';
import { UserRespositoryImpl } from "../../../Data/repositories/UserRespository";
import { User } from "../../entities/User";

const {updateWithImage} = new UserRespositoryImpl()

export const UpdateUserWithImageUseCase = async(user: User, file: ImagePicker.ImagePickerAsset) => {
    return await updateWithImage(user, file);
}

