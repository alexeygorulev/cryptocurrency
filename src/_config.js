export const vsCurrencies = [
  { name: 'BTC', id: 1, url: require("@/assets/img/bitcoin.png"), exchangeRate: {usd: 0.23321, eth: 0.4444, btc: 1},},
  { name: 'USD', id: 2, url: require("@/assets/img/USD.png"), exchangeRate: {usd: 1, eth: "", btc: ""},},
  { name: 'ETN', id: 3, url: require("@/assets/img/eth.png"), exchangeRate: {usd: "", eth: 1, btc: ""},},
]

export const errorSymbols = ' ' + 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ-+/*()&^%$#<>@!||'

export const options = [
  { name: 'BTC', id: "btc", url: require("@/assets/img/bitcoin.png"),},
  { name: 'USD', id: "usd", url: require("@/assets/img/USD.png"),},
  { name: 'ETN', id: "eth", url: require("@/assets/img/eth.png"),},
]

export const selected = {
  name: 'USD',
  id: "usd",
  url: require("@/assets/img/USD.png"),
}


export const selectedCurrency = {
  name: 'BTN',
  id: 1,
  url: require("@/assets/img/bitcoin.png"),
  exchangeRate: {usd: "", eth: 0.44444, btc: 1,},
}

export const iconsLinks = [
  {url: require("@/assets/img/bitcoin.png"),usd: "29030"  + " $",},
  {url: require("@/assets/img/bnb.png"),usd: "292"  + " $",},
  {url: require("@/assets/img/eth.png"),usd: "1969"  + " $",},
  {url: require("@/assets/img/tether.png"),usd: "1000"  + " $",},
]

export const links = [
  {
  title: 'Home',
  url: '/',
  alias: "home"
},
{
  title: 'About',
  url: '/about',
  alias: "about"
},
]

export const icons = [{
  url: 'https://vk.com/alexey_gorylev',
  alias: "vk",
  path: require('@/assets/img/vk.png'),
},
{
  url: 'https://yaroslavl.hh.ru/resume/06c56530ff0407e6200039ed1f614276585269',
  alias: "hh",
  path: require('@/assets/img/hh.png'),
},
{
  url: 'https://career.habr.com/alexey_gorulev',
  alias: "habr",
  path: require('@/assets/img/habr.png'),
},
{
  url: 'https://www.instagram.com/alexey_gorulev/',
  alias: "inst",
  path: require('@/assets/img/inst.png'),
},]
