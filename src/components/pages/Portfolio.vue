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
                <p><img @click="addBtc" class="img__selected icons" src="@/assets/img/plus.png" alt=""></p>
                <p><img @click="addUsd" class="img__selected icons" src="@/assets/img/plus.png" alt=""></p>
                <p><img @click="addEth" class="img__selected icons" src="@/assets/img/plus.png" alt=""></p>
              </div>
              <div class="item" >
                <p><img @click="removeBtc" class="img__selected icons" src="@/assets/img/minus.png" alt=""></p>
                <p><img @click="removeUsd" class="img__selected icons" src="@/assets/img/minus.png" alt=""></p>
                <p><img @click="removeEth" class="img__selected icons" src="@/assets/img/minus.png" alt=""></p>
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
      <DiagramPortfolio
        :currencyMovementBtc ="currencyMovementBtc"
        :currencyMovementUsd ="currencyMovementUsd"
        :currencyMovementEth ="currencyMovementEth"
      />
    </div>
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
  mounted() {
    this.getPriceBtc()
    this.getPriceEth()
    this.getPriceUsd()
  },
  methods: {
    getPriceUsd() {
      this.items[1].priceUsd *= this.items[1].total
      this.currencyMovementUsd.unshift(this.items[1].priceUsd)

    },
    getPriceBtc() {
      DataService.getPriceBtcToUsd()
      .then((res) => {
        for (let index = 0; index < this.items.length; index++) {
          if (this.items[index].id == 'btc') {
            this.priceBtc = res.data.bitcoin.usd
            this.items[index].priceUsd = res.data.bitcoin.usd * this.items[index].total
            this.balance +=  this.items[index].priceUsd
            this.currencyMovementBtc.unshift(this.items[index].priceUsd)
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
          }
        }
      })
    },
    addComma(number) {
      if (number.toFixed().toString().length > 3 && number.toFixed().toString().length < 7 ) {
        const a = number.toFixed().toString().split('').reverse()
        a.splice(3,0, ",")
        return "$" + a.reverse().join("")
        } else if( number.toFixed().toString().length > 6 ) {
          const a = number.toFixed().toString().split('').reverse()
          a.splice(3, 0, ',')
          return  a.reverse().join("")
        }
    },
    removeComma(number) {
      if (number.toFixed().toString().length > 3 && number.toFixed().toString().length < 7 ) {
        const a = number.toFixed().toString().split('').reverse()
        a.splice(4,1)
        return  a.reverse().join("")
        } else if( number.toFixed().toString().length > 6 ) {
          const a = number.toFixed().toString().split('').reverse()
          a.splice(2, 1)
          return  a.reverse().join("")
        }
    },
    // добавление и убавление биткойна
    addBtc() {
      if (this.items[0].total > 0) {
      this.items[0].total++
      this.items[0].priceUsd += this.priceBtc
      this.currencyMovementBtc.unshift(this.items[0].priceUsd)
      this.balance += this.priceBtc
      }
    },
    removeBtc() {
      if (this.items[0].total > 0) {
      this.items[0].total--
      this.items[0].priceUsd -= this.priceBtc
      this.currencyMovementBtc.unshift(this.items[0].priceUsd)
      this.balance -= this.priceBtc
      }
    },
    // добавление и убавление эфира
    addEth() {
      if (this.items[2].total > 0) {
      this.items[2].total++
      this.items[2].priceUsd += this.priceEth
      this.currencyMovementEth.unshift(this.items[2].priceUsd)
      this.balance += this.priceEth
      }
    },
    removeEth() {
      if (this.items[2].total > 0) {
      this.items[2].total--
      this.items[2].priceUsd -= this.priceEth
      this.currencyMovementEth.unshift(this.items[2].priceUsd)
      this.balance -= this.priceEth
      }
    },
    // добавление и убавление доллара
    addUsd() {
      if (this.items[1].total > 0) {
      this.items[1].total++
      this.items[1].priceUsd++
      this.currencyMovementUsd.unshift(this.items[1].priceUsd)
      this.balance += this.priceUsd
      }
    },
    removeUsd() {
      if (this.items[1].total > 0) {
      this.items[1].total--
      this.items[1].priceUsd--
      this.currencyMovementUsd.unshift(this.items[1].priceUsd)
      this.balance -= this.priceUsd
      }
    },


  },
}
</script>
