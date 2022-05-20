<template>
<div class="chart">

  <div  class="chart item1">
    <canvas  id="myChartBtcToUsd" ></canvas>
  </div>

</div>
</template>


<script>
import Chart from 'chart.js/auto';
// import {myChartBtcToEth} from "@/services/diagram/diagramBtcToEth";
import {myChartBtcToUsd} from "@/services/diagram/diagramBtcToUsd";
// import {myChartEthToUsd} from "@/services/diagram/diagramEthToUsd";
// import {myChartEthToBtc} from "@/services/diagram/diagramEthToBtc";
// import {myChartUsdToBtc} from "@/services/diagram/diagramUsdToBtc";
// import {myChartUsdToEth} from "@/services/diagram/diagramUsdToEth";

export default {
  extends: Chart,
  components: {
    myChartBtcToUsd,
    // myChartBtcToEth,
    // myChartEthToUsd,
    // myChartEthToBtc,
    // myChartUsdToBtc,
    // myChartUsdToEth,
    },
  props: {
    markerIdCurrency: {
      type: String,
      default: "btc1"
    },
    markerIdResult: {
      type: String,
      default: "usd"
    }
  },
  data() {
    return {
      idCurrency: '',
      idResult: '',
      markerBtcToUsd: true,
      markerBtcToEth: false,
      markerEthToUsd: false,
      markerEthToUsd: false,
      markerUsdToBtc: false,
      markerUsdToEth: false,
    }
  },
  watch: {
    markerIdCurrency(update) {
      this.idCurrency = update
      // this.get()
    },
    markerIdResult(updates) {
      this.idResult = updates
      // this.get()
    },
  },
  mounted () {
    myChartBtcToUsd()
// Далее я пробовал привязать график к курсу, чтобы при выборе курса менялся график с помощью v-if
  },
  methods: {
    // getAllPrice(a) {
// ----- Не получилось реализовать получение данных с API циклом т.к. после двух циклов получал ошибку с CORS
// Поэтому вводил данные вручную.

    //   const c = axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/history?date=`+ `${a}` + `-05-2022`)
    //   .then((res) => {
    //     this.allPriceUsd.push(res.data.market_data.current_price.usd)
    //   })
    // },
    // getPrice() {
    //   for (let index = 13; index != 0; index--) {
    //     this.getAllPrice(index)
    //   }
    // },
    // get() {

    //   if (this.idResult == "btc" && this.idCurrency == 'usd') {
    //     this.markerBtcToUsd = true
    //     this.markerBtcToEth = false
    //     this.markerEthToUsd = false
    //     this.markerEthToBtc = false
    //     this.markerUsdToBtc = false
    //     this.markerUsdToEth = false
    //     myChartBtcToUsd()
    //     }
    //   else if (this.idResult == "btc" && this.idCurrency == 'eth') {
    //     this.markerBtcToUsd = false
    //     this.markerBtcToEth = true
    //     this.markerEthToUsd = false
    //     this.markerEthToBtc= false
    //     this.markerUsdToBtc = false
    //     this.markerUsdToEth = false
    //     console.log(this.markerBtcToEth)
    //     console.log( this.markerBtcToUsd)

    //     myChartBtcToEth()
    //   }
    //   else if (this.idResult == "eth" && this.idCurrency == 'usd') {
    //     this.markerBtcToUsd = false
    //     this.markerBtcToEth = false
    //     this.markerEthToUsd = true
    //     this.markerEthToBtc = false
    //     this.markerUsdToBtc = false
    //     this.markerUsdToEth = false
    //     myChartEthToUsd()
    //   }




      //   switch (this.idCurrency this.idCurrency) {
      // case this.idResult == "btc" && this.idCurrency == 'usd' : {
      //   console.log('asdasd')
      //   this.markerBtcToUsd = true
      //   this.markerBtcToEth = false
      //   this.markerEthToUsd = false
      //   this.markerEthToUsd = false
      //   this.markerUsdToBtc = false
      //   this.markerUsdToEth = false
      //   myChartBtcToUsd()
      //   break;
      // }
      // case 'btc' == 'eth': {
      //   console.log('asdasd222')
      //   this.markerBtcToUsd = false
      //   this.markerBtcToEth = true
      //   this.markerEthToUsd = false
      //   this.markerEthToUsd = false
      //   this.markerUsdToBtc = false
      //   this.markerUsdToEth = false
      //   myChartBtcToEth()
      //   break;
      // }
      // case 'eth' == 'usd': {
      //   this.markerBtcToUsd = false
      //   this.markerBtcToEth = false
      //   this.markerEthToUsd = true
      //   this.markerEthToUsd = false
      //   this.markerUsdToBtc = false
      //   this.markerUsdToEth = false
      //   myChartEthToUsd()
      //   break;
      // }

    // }
    // }


  }
}
</script>

<style lang="scss">
.chart {
  position: relative;
  width: 52vw;
  height: 50vh;
  left: 30px;

}

</style>
