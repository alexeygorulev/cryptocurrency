<template>
  <div class="body__container">
    <div class="icon__container">
      <div class="icons">
        <div v-for="iconsLink in iconsLinks" :key="iconsLink.usd">
          <p class="icons__items"><img class="img__items" :src="iconsLink.url" alt="Bit"> {{iconsLink.usd}}
            <img class="img" src="@/assets/img/greenArrow.png" alt="||">
          </p>
        </div>
      </div>
    </div>
    <div class="form__wrapper">
      <form action="#" >
        <div class="form__container">
          <div class="form__list">
            <div>From</div>
            <div>To</div>
          </div>
        <div class="selected__wrapper">
          <v-select
          :options="options"
          @select="optionSelect"
          :selected="selected"
          :vsCurrencies="vsCurrencies"
          :selectedCurrency="selectedCurrency"
          @currencySelect="currencySelect"
          />
          </div>
          <div class="input__container">
              <input  class="input__item" type="text" v-model="amountOfCurrency">
              <input disabled class="input__item" type="text" v-model="сonversionResult">
          </div>
        </div>
      </form>
    </div>

  </div>
</template>
<script>
import {options, selected, vsCurrencies, selectedCurrency, iconsLinks, errorSymbols} from "@/_config"
import vSelect from "@/components/UI/v-select.vue"
import DataService from '@/services/DataService.js';

export default {
  components: {
    vSelect,
    DataService,
    iconsLinks,
    errorSymbols
    },
  data() {
    return {
      options: options,
      selected: selected,
      selectedCurrency: selectedCurrency,
      vsCurrencies: vsCurrencies,
      iconsLinks:iconsLinks,
      errorSymbols:errorSymbols,
      amountOfCurrency: "",
      сonversionResult: "",
    }
  },
  watch: {
    amountOfCurrency(update) {
      console.log(update)
      if (this.selected.id == this.selectedCurrency.id) {
        this.amountOfCurrency = ""
        this.сonversionResult = "выберите разные токены"
      } else this.fixedNumber()
  },
    selected(update) {
      this.amountOfCurrency = ""
      this.getPrices()
      this.changeSelectMenu()
      this.markerIdToHome(this.selectedCurrency.id,this.selected.id)
    },
    selectedCurrency(update) {
      this.amountOfCurrency = ""
      this.getPrices()
      this.changeSelectMenu()
      this.markerIdToHome(this.selectedCurrency.id, this.selected.id,)
    }
  },
  mounted(){
    this.getPrices()
  },
  methods: {
    markerIdToHome(currency, result) {
        this.$emit('markerId', currency, result)
      },
    optionSelect(option) {
      this.selected = option
    },
    currencySelect(currency) {
      this.selectedCurrency = currency
    },
    changeValue() {
      const a = Object.entries(this.selectedCurrency.exchangeRate)
      const b = a.map(item => {
        if (item[0] == this.selected.id) {
          const fixedNumber = item[1] * this.amountOfCurrency
          this.сonversionResult = fixedNumber.toFixed(5)
          }
        })
    },
    changeSelectMenu() {
      const a = Object.entries(this.selectedCurrency.exchangeRate)
      const b = a.map(item => {
        if(this.selected.id == this.selectedCurrency.id) {
          this.amountOfCurrency = ""
          this.сonversionResult = "выберите разные токены"
        }
        else if (item[0] == this.selected.id) {
          this.сonversionResult = item[1]
          }

        })
    },
    fixedNumber() {
      const errorSymbol = this.amountOfCurrency.split('')
      let errorMarkerWords = ''
      for (let index = 0; index < errorSymbol.length; index++) {
        const elementValidationWords = this.errorSymbols.split('').map(item => item).find(item => item == errorSymbol[index])
        errorMarkerWords = errorSymbols.split('').map(item => item == elementValidationWords ? true : false).find(item => item == true)
      }
      if (errorMarkerWords) {
        this.сonversionResult = 'Не корректное значение'
      } else {
        this.changeValue()
      if (this.сonversionResult == 0) {
        this.сonversionResult = ""
        }
      }
    },
    getPrices() {
      DataService.getPriceUsdToBtc()
      .then((res) => {
        this.vsCurrencies[0].exchangeRate.usd = res.data.dollars.btc
        this.selectedCurrency.exchangeRate.usd = res.data.dollars.btc.toFixed(10)

      })
      .catch((e) => console.log(e))
// ////////////////////////////////////////////////////
      DataService.getPriceUsdToEth()
      .then((res) => {
        this.vsCurrencies[2].exchangeRate.usd = res.data.dollars.eth.toFixed(10)
      })
      .catch((e) => console.log(e))
// ////////////////////////////////////////////////////
      DataService.getPriceBtcToUsd()
      .then((res) => {
        this.vsCurrencies[1].exchangeRate.btc = res.data.bitcoin.usd
      })
      .catch((e) => console.log(e))
// ////////////////////////////////////////////////////
      DataService.getPriceBtcToEth()
      .then((res) => {
        this.vsCurrencies[2].exchangeRate.btc = res.data.bitcoin.eth
        this.selectedCurrency.exchangeRate.btc = res.data.bitcoin.eth
      })
      .catch((e) => console.log(e))
// ////////////////////////////////////////////////////
      DataService.getPriceEthToUsd()
      .then((res) => {
        this.vsCurrencies[1].exchangeRate.eth = res.data.ethereum.usd
      })
      .catch((e) => console.log(e))
// ////////////////////////////////////////////////////
      DataService.getPriceEthToBtc()
      .then((res) => {
        this.vsCurrencies[0].exchangeRate.eth = res.data.ethereum.btc
      })
      .catch((e) => console.log(e))
    }
  }
}
</script>
<style lang="scss">
</style>
