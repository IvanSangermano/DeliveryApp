import { CardTokenParams } from "../../Data/sources/remote/models/CardTokenParams";
import { IdentificationType } from "../../Data/sources/remote/models/IdentificationType";
import { PaymentParams } from "../../Data/sources/remote/models/PaymentParams";
import { ResponseAPIDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { ResponseMercadoPagoCardToken } from "../../Data/sources/remote/models/ResponseMercadoPagoCardToken";
import { ResponseMercadoPagoInstallments } from "../../Data/sources/remote/models/ResponseMercadoPagoInstallments";

export interface MercadoPagoRepository {
    getIdentificationTypes(): Promise<IdentificationType[]>
    getInstallments(bin: string, amount: number): Promise<ResponseMercadoPagoInstallments>
    createCardToken(cardTokenParams: CardTokenParams): Promise<ResponseMercadoPagoCardToken> 
    createPayment(paymentParams: PaymentParams): Promise<ResponseAPIDelivery>
}