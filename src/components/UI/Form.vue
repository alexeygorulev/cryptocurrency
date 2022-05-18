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
      <form action="#" class="note-form">
        <div class="form__container">
          <div class="class__div">
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
            <div class="input__list">
              <input  class="input__item isCenter" type="text" v-model="amountOfCurrency">
            </div>
            <div >
              <input disabled class="input__item isCenter" type="text" v-model="сonversionResult">
            </div>
          </div>
        </div>
        <img class="input__icon" src="@/assets/img/downArrow.png" alt="123">
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
      this.fixedNumber()
  },
    selected(update) {
      this.amountOfCurrency = ""
      this.getPrices()
      this.changeSelectMenu()


    },
    selectedCurrency( update) {
      this.amountOfCurrency = ""
      this.getPrices()
      this.changeSelectMenu()


    }
  },
  mounted(){
    this.getPrices()
  },
  methods: {
    optionSelect(option) {
      this.selected = option
    },
    currencySelect(currency) {
      console.log(currency)
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
        if (item[0] == this.selected.id) {
          this.сonversionResult = item[1]
          }
        })
    },
    fixedNumber() {
      const findErrorSymbol = errorSymbols.split('').map(item => item == this.amountOfCurrency ? true : false).find(item => item == true)
      if (findErrorSymbol) {
        this.сonversionResult = 'Не корректное значение'
      } else
      {
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
