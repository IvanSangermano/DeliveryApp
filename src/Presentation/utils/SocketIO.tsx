import io from 'socket.io-client'

const socket = io('http://10.0.2.2:3000/orders/delivery')
export default socket