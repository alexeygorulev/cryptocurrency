<template>
  <div class="Card">
    <div class="Card Form">
      <Form/>
    </div>
    <div class="Card Diagram">
      <Diagram />
    </div>



  </div>
</template>

<script>
import Form from "@/components/UI/Form.vue"
import Diagram from "@/components/UI/Diagram.vue"
export default {
  components: {Form, Diagram}
}
</script>

<style lang="scss" >
  .Card {
    display: flex;
    justify-content: space-between;
    &.Form {
      width: 40%;
      color: rgb(223, 39, 39)
    }
    &.Diagram {
      width: 60%;
      margin-left: auto;
      margin-right: auto;
    }
  }

</style>
