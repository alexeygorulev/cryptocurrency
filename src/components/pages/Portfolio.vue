<template>
  <div class="Card">
      <div class="portfolio__container">
        <div class="portfolio__title">
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
          <div class="title__item white">
            Your Assets:
          </div>
          <div class="title__list">
            <div class="title__names">
              <p>Name</p>
              <p class="title__name" v-for="item in items" :key="item.id">
                <img class="img__selected" :src="item.url" alt="">
                {{item.name}}
              </p>
            </div>
            <div class="title__items">
              <div class="title__price">
                <p>Price $</p>
                <p v-for="item in items" :key="item.id" >$ {{item.priceUsd}}</p>
              </div>
              <div>
                <p>add</p>
                <p><img @click="addBtc" class="img__selected icons" src="@/assets/img/plus.png" alt=""></p>
                <p><img @click="addUsd" class="img__selected icons" src="@/assets/img/plus.png" alt=""></p>
                <p><img @click="addEth" class="img__selected icons" src="@/assets/img/plus.png" alt=""></p>
                </div>
              <div>
                <p>decrease</p>
                <p><img @click="removeBtc" class="img__selected icons" src="@/assets/img/minus.png" alt=""></p>
                <p><img @click="removeUsd" class="img__selected icons" src="@/assets/img/minus.png" alt=""></p>
                <p><img @click="removeEth" class="img__selected icons" src="@/assets/img/minus.png" alt=""></p>
                </div>
              <div>
                <p>Total</p>
                <p v-for="item in items" :key="item.id" >{{item.total}}</p>
                </div>
            </div>
          </div>
      </div>
      <DiagramPortfolio
        :currencyMovementBtc ="currencyMovementBtc"
        :currencyMovementUsd ="currencyMovementUsd"
        :currencyMovementEth ="currencyMovementEth"
      />
  </div>
</template>

<script>
import DataService from "@/services/DataService"
import DiagramPortfolio  from "@/components/UI/DiagramPortfolio.vue";
import {items} from "@/_config"
export default {
  components: {DiagramPortfolio, DataService, items},
  data() {
    return {
      balance: 0,
      priceBtc: "",
      priceEth: "",
      priceUsd: 1,
      currencyMovementBtc: [],
      currencyMovementUsd: [],
      currencyMovementEth: [],
      items: items,
    }
  },
  created() {
    this.getPriceBtc()
    this.getPriceEth()
  },
  methods: {
    getPriceBtc() {
      DataService.getPriceBtcToUsd()
      .then((res) => {
        for (let index = 0; index < this.items.length; index++) {
          if (this.items[index].id == 'btc') {
            this.priceBtc = res.data.bitcoin.usd
            this.items[index].priceUsd = res.data.bitcoin.usd * this.items[index].total
            this.balance +=  this.items[index].priceUsd
            this.currencyMovementBtc.unshift(this.items[index].priceUsd)
            this.items[0].priceUsd = this.addComma(this.items[0].priceUsd)
          }
        }
      })
    },
    getPriceEth() {
      DataService.getPriceEthToUsd()
      .then((res) => {
        for (let index = 0; index < this.items.length; index++) {
          this.priceEth = res.data.ethereum.usd
          if (this.items[index].id == 'eth') {
            this.items[index].priceUsd = res.data.ethereum.usd * this.items[index].total
            this.balance +=  this.items[index].priceUsd
            this.currencyMovementEth.unshift(this.items[index].priceUsd)
            this.items[2].priceUsd = this.addComma(this.items[2].priceUsd)
            this.balance = this.addComma(this.balance)

          }
        }
      })
    },
    addComma(number) {
      if (number.toFixed().toString().length > 3 && number.toFixed().toString().length < 7 ) {
        const a = number.toFixed().toString().split('').reverse()
        a.splice(3,0, ",")
        return a.reverse().join("")
        } else if( number.toFixed().toString().length > 6 ) {
          const a = number.toFixed().toString().split('').reverse()
          a.splice(3, 0, ',')
          a.splice(7, 0, ',')
          return  a.reverse().join("")
        }
    },
    removeComma(number) {
      if (number.toString().length > 3 && number.toString().length <= 7
      && number.toString().split('').find(item => item == ',') == ',' )
        {
        console.log('тута')
        const a = number.toString().split('').reverse()
        a.splice(3,1)
        return  a.reverse().join("")
        } else if( number.toString().length > 6
        && number.toString().split('').find(item => item == ',') == ',')
        {
          const a = number.toString().split('').reverse()
          a.splice(3, 1)
          a.splice(6, 1)
          return  a.reverse().join("")
        } else return number
    },
    // добавление и убавление биткойна
    addBtc() {
      if (this.items[0].total >= 0) {
      this.items[0].total++
      this.items[0].priceUsd = +this.removeComma(this.items[0].priceUsd) + this.priceBtc
      this.balance = +this.removeComma(this.balance) + this.priceBtc
      this.balance = this.addComma(this.balance)
      this.items[0].priceUsd = this.addComma(this.items[0].priceUsd)
      }
    },
    removeBtc() {
      if (this.items[0].total > 0) {
        this.items[0].total--
        this.items[0].priceUsd = +this.removeComma(this.items[0].priceUsd) - this.priceBtc
        this.balance = +this.removeComma(this.balance) - this.priceBtc
        this.balance = this.addComma(this.balance)
        this.items[0].priceUsd = this.addComma(this.items[0].priceUsd)
        if (this.items[0].priceUsd == undefined) {
          this.items[0].priceUsd = 0
        }
        if (this.balance == undefined) {
          this.balance = 0
        }
      }
    },
    // добавление и убавление эфира
    addEth() {
      if (this.items[2].total >= 0) {
      this.items[2].total++
      this.items[2].priceUsd = +this.removeComma(this.items[2].priceUsd) + this.priceEth
      this.balance = +this.removeComma(this.balance) + this.priceEth
      this.balance = this.addComma(this.balance)
      this.items[2].priceUsd = this.addComma(this.items[2].priceUsd)
      }
    },
    removeEth() {
      if (this.items[2].total > 0) {
        this.items[2].total--
        this.items[2].priceUsd = +this.removeComma(this.items[2].priceUsd) - this.priceEth
        this.balance = +this.removeComma(this.balance) - this.priceEth
        this.balance = this.addComma(this.balance)
        this.items[2].priceUsd = this.addComma(this.items[2].priceUsd)
        if( this.items[2].priceUsd == undefined) {
          this.items[2].priceUsd = 0
          }
        if (this.balance == undefined) {
          this.balance = 0
        }
      }
    },
    // добавление и убавление доллара
    addUsd() {
      if (this.items[1].total >= 0) {
      this.items[1].total++
      this.items[1].priceUsd = +this.removeComma(this.items[1].priceUsd) + 1
      this.balance = +this.removeComma(this.balance) + this.priceUsd
      this.balance = this.addComma(this.balance)
      this.items[1].priceUsd = this.addComma(this.items[1].priceUsd)
      }
    },
    removeUsd() {
      if (this.items[1].total > 0) {
        this.items[1].total--
        this.items[1].priceUsd = +this.removeComma(this.items[1].priceUsd) - 1
        this.balance = +this.removeComma(this.balance) - this.priceUsd
        this.balance = this.addComma(this.balance)
        this.items[1].priceUsd = this.addComma(this.items[1].priceUsd)
        if (this.items[1].priceUsd == undefined) {
          this.items[1].priceUsd = 0
          }
        if (this.balance == undefined) {
          this.balance = 0
        }
      }
    },
  },
}
</script>
