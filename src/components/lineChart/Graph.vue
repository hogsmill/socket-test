<template>
  <canvas id="canvas" />
</template>

<script>
import bus from '../../socket.js'

import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default {
  mounted() {
    bus.on('showGraph', (data) => {
      this.renderChart(data)
    })
  },
  methods: {
    renderChart(data) {
      console.log(data)
      const ctx = document.getElementById('canvas').getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: data.chartdata,
        options: data.options
      })
    }
  }
}
</script>

<style lang="scss">
  canvas {
    width: 800px;
    height: 600px;
    margin: 0 auto;
  }
</style>
