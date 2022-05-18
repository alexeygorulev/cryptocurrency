import axios from "axios";


const API_PRICE_USD_TO_BTC = "https://api.coingecko.com/api/v3/simple/price?ids=dollars&vs_currencies=btc";
const API_PRICE_USD_TO_ETH = "https://api.coingecko.com/api/v3/simple/price?ids=dollars&vs_currencies=eth";

const API_PRICE_BTC_TO_USD = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
const API_PRICE_BTC_TO_ETH = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth";

const API_PRICE_ETH_TO_BTC = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc";
const API_PRICE_ETH_TO_USD = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";



class DataService {

  getPriceUsdToBtc() {
    return axios.get(API_PRICE_USD_TO_BTC)
  }
  getPriceUsdToEth() {
    return axios.get(API_PRICE_USD_TO_ETH)
  }


  getPriceBtcToUsd() {
    return axios.get(API_PRICE_BTC_TO_USD)
  }
  getPriceBtcToEth() {
    return axios.get(API_PRICE_BTC_TO_ETH)
  }


  getPriceEthToUsd() {
    return axios.get(API_PRICE_ETH_TO_USD)
  }
  getPriceEthToBtc() {
    return axios.get(API_PRICE_ETH_TO_BTC)
  }



}



export default new DataService()
