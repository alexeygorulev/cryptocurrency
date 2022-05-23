<template>
  <div class="v-select">
    <div @click="areOptionsVisible = !areOptionsVisible"
    class="title">
    <img class="img__selected"
    :src="selected.url"
    alt="1">
    {{selected.name}}
    </div>
    <div class="options" v-if="areOptionsVisible">
      <div class="options__items"
      v-for="option in options"
      :key="option.id"
      @click="selectOption(option)"
      >
        <img class="img__selected" :src="option.url" alt="1">
        {{option.name}}
      </div>
    </div>
  </div>
  <div class="v-select">
    <p @click="areOptionsVisibleSecond = !areOptionsVisibleSecond" class="title"><img class="img__selected" :src="selectedCurrency.url" alt="1">{{selectedCurrency.name}}</p>
    <div class="options" v-if="areOptionsVisibleSecond">
      <div class="options__items"
      v-for="currency in vsCurrencies"
      :key="currency.id"
      @click="currencySelect(currency)"
      >
        <img class="img__selected" :src="currency.url" alt="1">
        {{currency.name}}
      </div>
    </div>
  </div>
</template>
  <script>
  export default {
    props: {
      options: {
        type: Array,
        default() {
          return []
        }
      },
      selected: {
        type: Object,
        default: '',
      },
      selectedCurrency: {
        type: Object,
        default: '',
      },
      vsCurrencies: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        areOptionsVisible: false,
        areOptionsVisibleSecond: false,
        hideSelected() {
        this.areOptionsVisible = false
        this.areOptionsVisibleSecond = false
        },
      }
    },
    mounted() {
      document.addEventListener('click', this.hideSelected.bind(this), true)
    },
    beforeDestroy() {
      document.removeEventListener('click',this.hideSelected)
    },
    methods: {
      selectRemove() {
        this.areOptionsVisible = !areOptionsVisible
      },
      selectOption(option) {
        this.$emit('select', option),
        this.areOptionsVisible = false
      },
      currencySelect(currency) {
        this.$emit('currencySelect', currency),
        this.areOptionsVisibleSecond = false
      }
    },
  }
  </script>

<style lang="scss">

</style>
