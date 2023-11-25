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
  
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<DropDownProps[]>([]);

  const { total, shoppingBag } = useContext(ShoppingBagContext)
  const { user } = useContext(UserContext)


  const creditCardRef = useRef() as any;
  const stripeClient = stripe("pk_test_51OG0uOHVZgNZiwCsCeqYrsyTp1KtEmHoE799CpfAm7DK549V4W55KTIisMQHufyJrGvfIm6giT8pxRSzVLSQqzwP00Qv83EfLI");
  
  useEffect(() => {
    onChange('identificationType', value)
  }, [value])

  useEffect(() => {
    if(values.number !== '' && values.expiration !== '' && values.cvv !== ''){
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

      console.log("RESPONSE: ", JSON.stringify(result,null,3))

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
    cardToken,
    open,
    value,
    items,
    creditCardRef,
    identificationTypeList,
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
