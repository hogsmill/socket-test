<template>
  <div id="app">
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <h1>Socket Test</h1>
    <h2>App Name: {{ appName }}</h2>
    <h2>Message: ({{ source }}) :{{ message }}, {{ date }}</h2>
    <h2>Emit: {{ emitMessage }}</h2>
    <button @click="send()">
      Send
    </button>
    <button @click="emit()">
      Emit
    </button>
    <SubComponent />
    <QrCode />
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'

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
      appName: 'LOCAL',
      date: '',
      message: '',
      emitMessage: '',
      source: ''
    }
  },
  computed: {
    connectionError() {
      return this.$store.getters.getConnectionError
    },
    localStorageStatus() {
      return this.$store.getters.getLocalStorageStatus
    }
  },
  created() {
    console.log(process.env)
    if (process.env.VUE_APP_NAME) {
      this.appName = process.env.VUE_APP_NAME
    }

    this.$store.dispatch('localStorageStatus', ls.check())

    bus.$on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.$on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })

    bus.$on('testMessage', (data) => {
      this.source = data.source
      this.date = data.date
      this.message = data.message
    })

    bus.$on('emitMessage', (data) => {
      this.emitMessage = data.message
    })
  },
  methods: {
    send() {
      bus.$emit('sendTestMessage', {source: 'App.vue', message: 'Hello World!'})
    },
    emit() {
      bus.$emit('sendEmitMessage', {message: 'Emitted Message!'})
    }
  }
}
</script>

<style lang="scss">

  .not-connected {
    background-color: red;
    color: #fff;
    font-weight: bold;
    margin: 6px;
  }
</style>
