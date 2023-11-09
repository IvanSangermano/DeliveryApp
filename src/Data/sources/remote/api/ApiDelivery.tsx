import axios, { AxiosHeaders } from 'axios';
import { LocalStorage } from '../../local/LocalStorage';
import { User } from '../../../../Domain/entities/User';

const ApiDelivery = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',
    headers: {
        'Content-type': 'application/json'
    }
})

const ApiDeliveryForImage = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',
    headers: {
        'Content-type': 'multipart/form-data',
        'accept': 'application/json',
    }
})

// INTERCEPTORS (middelware, del lado backend choca contra passport)
ApiDelivery.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user')
        if(data) {
            const user: User = JSON.parse(data as any)
            config.headers!['Authorization'] = user?.session_token!
            //(config.headers as AxiosHeaders).set("Authorization", `${user.session_token!}`)
        }
        return config
    }
)
ApiDeliveryForImage.interceptors.request.use(
    async(config) => {
        const data = await LocalStorage().getItem('user')
        if(data) {
            const user: User = JSON.parse(data as any)
            config.headers!['Authorization'] = user?.session_token!
            //(config.headers as AxiosHeaders).set("Authorization", `${user.session_token!}`)
        }
        return config
    }
)

export { ApiDelivery, ApiDeliveryForImage }