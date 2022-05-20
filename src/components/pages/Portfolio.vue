<template>
  <div class="Card">
    <div class="Card Form">
      <div class="form__wrapper">
        <div class="note-form">
          <div class="title">
            <span>Your  Portfolio</span>
          </div>
          <div class="title__item">
            <div>
              Current balance:
            </div>
            <div class="title__item big">
              <span>$ {{balance}}</span>
            </div>
          </div>
          <div class="title">
            Your Assets:
          </div>
          <div class="title__list">
            <div >
              <p>Name</p>
            </div>
            <div class="title__items">
              <p>Price $</p>
              <p>add</p>
              <p>decrease</p>
              <p>Total</p>
            </div>
          </div>
          <div class="title__list">
            <div class="item" >
              <div v-for="item in items" :key="item.id" >
                <p class="item img"><img class="img__selected" :src="item.url" alt="">
                {{item.name}}
                </p>
              </div>
            </div>
            <div class="title__items">
              <div class="price" >
                <p v-for="item in items" :key="item.id" >$ {{item.priceUsd}}</p>
              </div>
              <div class="item" >
                <p @click="someMethod" v-for="item in items" :key="item.id" >
                  <img class="img__selected icons" :src="item.urlPlus" alt="">
                </p>
              </div>
              <div class="item" >
                <p v-for="item in items" :key="item.id" >
                  <img class="img__selected icons" :src="item.urlMinus" alt="">
                </p>
              </div>
              <div class="total">
                <p v-for="item in items" :key="item.id" >{{item.total}}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    <div class="Card Diagram">
      <DiagramPortfolio />
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService"
import DiagramPortfolio  from "@/components/UI/DiagramPortfolio.vue";
export default {
  components: {DiagramPortfolio, DataService},
  data() {
    return {
      balance: 23142,
      items: [
        {
          name: "Bitcoin",
          id: 0,
          add: "+",
          decrease: '-',
          url: require("@/assets/img/bitcoin.png"),
          urlPlus: require("@/assets/img/plus.png"),
          urlMinus: require("@/assets/img/minus.png"),
          priceUsd: 3001,
          total: 23
        },
        {
          name: "Usd",
          id: "usd",
          add: "+",
          decrease: '-',
          url: require("@/assets/img/USD.png"),
          urlPlus: require("@/assets/img/plus.png"),
          urlMinus: require("@/assets/img/minus.png"),
          priceUsd: 1,
          total: 23
        },
        {
          name: "Ethereum",
          add: "+",
          id: "eth",
          decrease: '-',
          url: require("@/assets/img/eth.png"),
          urlPlus: require("@/assets/img/plus.png"),
          urlMinus: require("@/assets/img/minus.png"),
          priceUsd: 14000,
          total: 23
        },
      ]
    }
  },
  watch: {
    items: {
      handle(update) {
        console.log('сработал')
        this.balance = +this.items[0].priceUsd + +this.items[1].priceUsd + +this.items[2].priceUsd
      },
      deep: true,
    }
  },
  mounted() {
    this.getPriceBtc()
    this.getPriceEth()
    this.items[0].priceUsd = this.items[0].priceUsd * this.items[0].total
    this.items[1].priceUsd = this.items[1].priceUsd * this.items[1].total
    this.items[2].priceUsd = this.items[2].priceUsd * this.items[2].total
  },
  methods: {
    totalPlus(context) {
      console.log(context)
    },
    getPriceBtc() {
      DataService.getPriceBtcToUsd()
      .then((res) => {
        for (let index = 0; index < this.items.length; index++) {
          if (this.items[index].id == 'btc') {
            this.items[index].priceUsd = res.data.bitcoin.usd * this.items[index].total
          }
        }
      })
    },
    getPriceEth() {
      DataService.getPriceEthToUsd()
      .then((res) => {
        for (let index = 0; index < this.items.length; index++) {
          if (this.items[index].id == 'eth') {
            this.items[index].priceUsd = res.data.ethereum.usd * this.items[index].total
          }
        }
      })
    },
    fixedPrice(number) {
      if (number.toString().length > 3 && number.toString().length < 7 ) {
        const a = number.toString().split('').reverse()
        a.splice(3,0, ",")
        return  a.reverse().join("")
        } else if( number.toString().length > 6 ) {
          const a = number.toFixed().toString().split('').reverse()
          a.splice(3, 0, ',')
          return  a.reverse().join("")
        }
    },
  },
}
</script>
