import React, {useEffect, useRef, useState} from 'react'
import { IdentificationType } from '../../../../../Data/sources/remote/models/IdentificationType';
import { GetIdentificationTypesMercadoPagoUseCase } from '../../../../../Domain/useCases/mercado_pago/GetIdentificationTypesMercadoPago';
import { CreateTokenMercadoPagoUseCase } from '../../../../../Domain/useCases/mercado_pago/CreateTokenMercadoPago';
import { CardTokenParams } from '../../../../../Data/sources/remote/models/CardTokenParams';
import { ResponseMercadoPagoCardToken } from '../../../../../Data/sources/remote/models/ResponseMercadoPagoCardToken';

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

  const creditCardRef = useRef() as any;

  useEffect(() => {
    onChange('identificationType', value)
  }, [value])

  useEffect(() => {
    if(values.brand !== '' && 
      values.cvv !== '' &&
      values.expiration !== '' &&
      values.holder !== '' &&
      values.number !== ''
      ){
        createCardToken()
      }
  }, [values])

  useEffect(() => {
    setDropDownItems()
  }, [identificationTypeList])

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
