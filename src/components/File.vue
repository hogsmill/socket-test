<template>
  <div>
    <div>
      <input type="file" id="upload">
      <button @click="submitFile">
        Upload!
      </button>
    </div>
    <div>
      <img :src="require(`../assets/${src}`)" />
      <!--
      <img :src="src ? require(src) : ''" />
      -->
      SRC: '{{ src }}'
    </div>
  </div>
</template>

<script>
import bus from '../socket.js'

export default {
  data() {
    return {
      filename: '',
      src: 'image-1.jpeg'
    }
  },
  created() {
    bus.on('fileUploaded', (data) => {
      if (data.filename == this.filename) {
        this.src = data.filename
      }
    })
  },
  methods: {
    submitFile() {
      const element = document.getElementById('upload')
      const file = element.files[0]
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = () => {
        this.filename = file.name
        bus.emit('sendUploadFile', {name: file.name, content: fileReader.result})
      }
    }
  }
}
</script>

<style>
img {
  width: 400px;
}
</style>
