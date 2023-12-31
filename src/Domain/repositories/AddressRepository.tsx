import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { Address } from "../entities/Address";

export interface AddressRepository {

    getByUser(idUser: string): Promise<Address[]>
    create(address: Address): Promise<ResponseAPIDelivery>

}