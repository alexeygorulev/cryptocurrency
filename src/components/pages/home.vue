<template>
  <div class="Card">
      <Form
      @markerId="getMarkerId"
      />
      <Diagram
      :markerIdCurrency="markerIdCurrency"
      :markerIdResult="markerIdResult"
      />
  </div>
</template>

<script>
import Form from "@/components/UI/Form.vue"
import Diagram from "@/components/UI/Diagram.vue"
export default {
  components: {Form, Diagram},
  data() {
    return {
      markerIdCurrency: '',
      markerIdResult: '',
    }
  },
    methods: {
    getMarkerId(result, currency) {
      this.markerIdCurrency = currency
      this.markerIdResult = result
    },
    getMarkerIdToDiagram(currency, result) {
      this.$emit('markerIdToDiagram', currency, result)
    }
  }
}
</script>

<style lang="scss">
  .Card {
    display: flex;
    justify-content: space-between;
    // border: 1px solid #fff;
    // width: 100vw;
  }


</style>
