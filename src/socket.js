import io from 'socket.io-client'
import bus from './EventBus'

let connStr
if (location.hostname == 'localhost') {
  connStr = 'http://localhost:3016'
} else {
  connStr = 'https://agilesimulations.co.uk:3016'
}
console.log('Connecting to: ' + connStr)
const socket = io(connStr)

socket.on('connect_error', (err) => { bus.$emit('connectionError', err) })

socket.on('updateConnections', (data) => { bus.$emit('updateConnections', data) })

// Send

bus.$on('sendTestMessage', (data) => { socket.emit('sendTestMessage', data) })


// Receive

socket.on('testMessage', (data) => { bus.$emit('testMessage', data) })

export default bus
