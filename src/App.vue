<template>
  <div id="app">
    <div v-if="connectionError" class="not-connected">
      WARNING: You are not connected to the server: {{ connectionError }}
    </div>
    <div v-if="localStorageStatus != 'ok'" class="not-connected">
      WARNING: {{ localStorageStatus }} - please enable cookies in browser settings
    </div>
    <h1>App Testbed</h1>
    <div class="buttons">
      <i class="fas fa-envelope-open-text" :class="{'selected': tab == 'messaging'}" @click="setTab('messaging')" title="Message/socket testing" />
      <i class="fas fa-chart-line" :class="{'selected': tab == 'graph'}" @click="setTab('graph')" title="Graph testing" />
      <i class="fas fa-qrcode" :class="{'selected': tab == 'qrcode'}" @click="setTab('qrcode')" title="QR Code testing" />
      <i class="fas fa-images" :class="{'selected': tab == 'carousel-sliderm'}" @click="setTab('carousel-sliderm')" title="Carousel sliderm testing" />
      <i class="fas fa-images" :class="{'selected': tab == 'carousel-vue3'}" @click="setTab('carousel-vue3')" title="Carousel Vue 3 testing" />
      <i class="fas fa-filealt" :class="{'selected': tab == 'file'}" @click="setTab('file')" title="File upload testing" />
    </div>
    <div>
      <table>
        <tr>
          <td>
            Dropdown test for Mac:
          </td>
          <td>
            <select id="dropdown-test-1" @change="dropdownChanged()">
              <option value="">
                -- Select --
              </option>
              <option value="first" :selected="option == 'first'">
                Change to 1st Option
              </option>
              <option value="second" :selected="option == 'second'">
                Change to 2nd Option
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            Conditional Select:
          </td>
          <td>
            <select id="dropdown-test-2">
              <option value="">
                -- Select --
              </option>
              <option v-for="(opt, index) in options" :key="index">
                {{ opt }}
              </option>
            </select>
          </td>
        </tr>
      </table>
    </div>
    <Messaging v-if="tab == 'messaging'" />
    <Graph v-if="tab == 'graph'" />
    <QrCode v-if="tab == 'qrcode'" />
    <CarouselTestSliderm v-if="tab == 'carousel-sliderm'" />
    <CarouselTestVue3 v-if="tab == 'carousel-vue3'" />
    <File v-if="tab == 'file'" />
  </div>
</template>

<script>
import bus from './socket.js'

import ls from './lib/localStorage.js'

import Messaging from './components/Messaging.vue'
import Graph from './components/Graph.vue'
import QrCode from './components/QrCode.vue'
import CarouselTestSliderm from './components/CarouselSliderm.vue'
import CarouselTestVue3 from './components/CarouselVue3.vue'
import File from './components/File.vue'

export default {
  name: 'App',
  components: {
    Messaging,
    Graph,
    QrCode,
    CarouselTestSliderm,
    CarouselTestVue3,
    File
  },
  data() {
    return {
      tab: '',
      option: '',
      options: [],
      opts: {
        'first': ['one', 'two', 'three'],
        'second': ['a', 'b', 'c']
      }
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
    this.$store.dispatch('localStorageStatus', ls.check())

    bus.on('connectionError', (data) => {
      this.$store.dispatch('updateConnectionError', data)
    })

    bus.on('updateConnections', (data) => {
      this.$store.dispatch('updateConnectionError', null)
      this.$store.dispatch('updateConnections', data)
    })
  },
  methods: {
    setTab(tab) {
      this.tab = tab
    },
    dropdownChanged() {
      this.option = document.getElementById('dropdown-test-1').value
      console.log('option', this.option)
      this.options = this.opts[this.option]
      console.log('options', this.options)
    }
  }
}
</script>

<style lang="scss">

  h1 {
    margin-top: 24px;
  }

  .not-connected {
    background-color: red;
    color: #fff;
    font-weight: bold;
    margin: 6px;
  }

  .buttons {
    margin-bottom: 24px;

    .fas {
      padding: 6px;
      margin: 6px;
      border: 1px solid;
      border-radius: 6px;
      color: #f4511e;

      &.selected {
        color: #fff;
        background-color: #f4511e;
      }
    }
  }

  table {
    margin: 0 auto;

    td {
      padding: 6px;
    }
  }
</style>
