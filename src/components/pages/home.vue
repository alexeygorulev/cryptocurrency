<template>
  <div class="Card">
    <div class="Card Form">
      <Form
      @markerId="getMarkerId"
      />
    </div>
    <div class="Card Diagram">
      <Diagram
      :markerIdCurrency="markerIdCurrency"
      :markerIdResult="markerIdResult"
      />
    </div>
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

<style lang="scss" >
  .Card {
    display: flex;
    justify-content: space-between;
    &.Form {
      width: 40%;
      color: rgb(223, 39, 39, 0.8)
    }
    &.Diagram {
      min-width: 60%;
      margin-left: auto;
      margin-right: auto;
    }
  }

</style>
