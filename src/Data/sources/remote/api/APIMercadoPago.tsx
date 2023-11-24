import axios from 'axios'

const ApiMercadoPago = axios.create({
    baseURL: 'https://api.mercadopago.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer TEST-2633768026562283-112216-1867e1e2623b2ff137e4f5b9af5c5c41-229371624'
    }
})

export { ApiMercadoPago }