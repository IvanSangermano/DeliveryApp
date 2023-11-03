import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { User } from "../entities/User";

export interface AuthRepository {
    
    login(email: string, password: string): Promise<ResponseAPIDelivery>
    register(user: User): Promise<ResponseAPIDelivery>

}