<template>
  <div>
    <button @click="show()">
      Show Modal
    </button>

    <modal name="popup" class="popup" :height="400" :classes="['rounded']">
      <div>
        <h4>Modal Test</h4>
        <button class="btn btn-sm btn-info" @click="done()">
          Done
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  methods: {
    show() {
      console.log('show')
      this.$modal.show('popup')
    },
    done() {
      console.log('hide')
      this.$modal.hide('popup')
    }
  }
}
</script>
