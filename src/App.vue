<template>
  <div id="app">
    <h1>Socket Test</h1>
    <h2>Message: ({{ source }}) :{{ message }}, {{ date }}</h2>
    <button @click="send()">
      Send
    </button>
    <SubComponent />
    <QrCode />
  </div>
</template>

<script>
import bus from './socket.js'

import SubComponent from './components/SubComponent.vue'
import QrCode from './components/QrCode.vue'

export default {
  name: 'App',
  components: {
    SubComponent,
    QrCode
  },
  data() {
    return {
      date: '',
      message: '',
      source: ''
    }
  },
  created() {
    bus.$on('testMessage', (data) => {
      console.log(data)
      this.source = data.source
      this.date = data.date
      this.message = data.message
    })
  },
  methods: {
    send() {
      bus.$emit('sendTestMessage', {source: 'App.vue', message: 'Hello World!'})
    }
  }
}
</script>
