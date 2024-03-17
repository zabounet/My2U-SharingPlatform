import io from 'socket.io-client'
import { SOCKET_URL } from '../config.js'

// use current ip address of the computer
const Socket = io(SOCKET_URL)

export default Socket