<template>
  <div id="app">
    <h1>Socket Test</h1>
    <h2>Message: {{ message }}</h2>
    <button @click="send()">Send</button>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'App',
  data() {
    return {
      message: ''
    }
  },
  created() {
    let host = '77.68.122.69'
    if (location.hostname == 'localhost') {
      host = 'localhost'
    }
    const connStr = 'http://' + host + ':3016'
    console.log('Connecting to: ' + connStr)
    this.socket = io(connStr)

    const self = this
    this.socket.on('testMessage', (data) => {
      console.log(data)
      self.message = data.message
    })
  },
  methods: {
    send() {
      this.socket.emit('testMessage', {message: 'Hello World!'})
    }
  }
}
</script>
