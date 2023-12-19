import React, {useEffect, useRef, useState, useContext} from 'react'
import { IdentificationType } from '../../../../../Data/sources/remote/models/IdentificationType';
import { GetIdentificationTypesMercadoPagoUseCase } from '../../../../../Domain/useCases/mercado_pago/GetIdentificationTypesMercadoPago';
import { CreateTokenMercadoPagoUseCase } from '../../../../../Domain/useCases/mercado_pago/CreateTokenMercadoPago';
import { CardTokenParams } from '../../../../../Data/sources/remote/models/CardTokenParams';
import { ResponseMercadoPagoCardToken } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken';
import { CreatePaymentStripeUseCase } from '../../../../../Domain/useCases/stripe/CreatePaymentStripe';
// @ts-ignore
import stripe from 'react-native-stripe-client'
import { ShoppingBagContext } from '../../../../context/ShoppingBagContex';
import { UserContext } from '../../../../context/UserContext';
import { STRIPE_CLIENT_KEY } from '../../../../contants/StripeClientKey';
import { ResponseAPIDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';

interface DropDownProps {
  label: string,
  value: string
}

const ClientPaymentFormViewModel = () => { 
  const [values, setValues] = useState({
    brand: '',
    cvv: '',
    expiration: '',
    holder: '',
    number: '',
  })
  const [identificationValues, setIdentificationValues] = useState({
    identificationNumber: '',
    identificationType: ''
  });
  const [identificationTypeList, setIdentificationTypeList] = useState<IdentificationType[]>([])
  const [cardToken, setCardToken] = useState<ResponseMercadoPagoCardToken>();
  const [mercadoPagoOption, setMercadoPagoOption] = useState(true);

  const [responsePaymentStripe, setResponsePaymentStripe] = useState<ResponseAPIDelivery>({
    success: false,
    message: ''
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);

  const { total, shoppingBag } = useContext(ShoppingBagContext)
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  const creditCardRef = useRef() as any;
  const stripeClient = stripe(STRIPE_CLIENT_KEY);
  
  useEffect(() => {
    onChange('identificationType', value)
  }, [value])
  
  useEffect(() => {
    if(values.number !== '' && values.expiration !== '' && values.cvv !== '' && !mercadoPagoOption){
      createTokenPayment()
    }
  }, [values])

  useEffect(() => {
    if(values.brand !== '' && 
      values.cvv !== '' &&
      values.expiration !== '' &&
      values.holder !== '' &&
      values.number !== '' &&
      identificationValues.identificationType !== '' &&
      identificationValues.identificationNumber !== ''
      ){
        createCardToken()
      }
  }, [values])

  useEffect(() => {
    setDropDownItems()
  }, [identificationTypeList])

  const createTokenPayment = async() => {
    setLoading(true)
    const response = await stripeClient.createToken({
      card: {
        number: values.number.replace(/\s/g, ''),
        exp_month: parseInt(values.expiration.split('/')[0]),
        exp_year: parseInt(values.expiration.split('/')[1]),
        cvc: values.cvv
      }
    });

    if(response.id !== undefined && response.id !== null) {
      const result = await CreatePaymentStripeUseCase(response.id, total, {
        id_client: user.id!,
        id_address: user.address?.id!,
        products: shoppingBag
      })
      setLoading(false)
      setResponsePaymentStripe({
        success: result.success, 
        message: result.message
      })
    }
  }

  const getIdentificationTypes = async () => {
    const result = await GetIdentificationTypesMercadoPagoUseCase()
    setIdentificationTypeList(result)
  }

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      if(error === null){
        setValues(data)
      }
    }
  }, []);

  const createCardToken = async() => {
    setLoading(true)
    const data: CardTokenParams = {
      card_number: values.number.replace(/\s/g, ''),
      expiration_year: values.expiration.split('/')[1],
      expiration_month: parseInt(values.expiration.split('/')[0]),
      security_code: values.cvv,
      cardholder: {
        name: values.holder,
        identification: {
          number: identificationValues.identificationNumber,
          type: identificationValues.identificationType
        }
      }
    }
    const result = await CreateTokenMercadoPagoUseCase(data)
    setLoading(false)
    if(result && result.id !== ''){
      setCardToken(result)
    }
  }

  const onChange = (property: string, value: any) => {
    setIdentificationValues({...identificationValues, [property]: value})
  }

  const setDropDownItems = () => {
    let itemsIdentification: DropDownProps[] = []
    identificationTypeList.forEach(indentification => {
      itemsIdentification.push({
            label: indentification.name,
            value: indentification.id
        })
    })
    setItems(itemsIdentification)
  }

  return {
    ...identificationValues,
    loading,
    responsePaymentStripe,
    mercadoPagoOption,
    cardToken,
    open,
    value,
    items,
    creditCardRef,
    identificationTypeList,
    setMercadoPagoOption,
    onChange,
    setOpen,
    setValue,
    setItems,
    handleSubmit,
    getIdentificationTypes,
    createCardToken
  }
}

export default ClientPaymentFormViewModel
