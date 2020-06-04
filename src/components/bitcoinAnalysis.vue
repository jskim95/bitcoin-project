<template>
  <div id="ALL">
    <div id="main">

      <!-- <div class="top">
        <strong>현재 시세</strong>
      </div> -->

      <div class="price">

        <div class="left">

          <div class="coinTitle" v-on:click="findweekCoin">
            <strong>일간 상승 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr v-on:click="drawChart(high[1], index, high)" v-for="(high, index) in todayHighCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{high[3]}}</a></strong></td>
              <td class="up coinPrice">{{high[4]}}원</td>
              <td class="up coinPercent">+{{high[0]}}%</td>
            </tr>
          </table>

        </div>

        <div class="right">

          <div class="coinTitle">
            <strong>일간 하락 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr class="down" v-on:click="drawChart(low[1], index, low)" v-for="(low, index) in todayLowCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{low[3]}}</a></strong></td>
              <td class="down coinPrice">{{low[4]}}원</td>
              <td class="down coinPercent">-{{low[0]}}%</td>
            </tr>
          </table>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
var axios = require('axios')
var cheerio = require('cheerio')

import {createNamespacedHelpers} from 'vuex'
const bitcoinData = createNamespacedHelpers('bitcoin')
export default {
  data() {
    return {
      todayHighCoin: [],
      todayLowCoin: [],
      weekHighCoin: [],
      weekLowCoin: [],

      total: [],
      weekTotal: [],
      find: '',
    }
  },
  computed: {
    ...bitcoinData.mapState([
      'allCoinEnglishName',
      'loaded',
      'tradeAllcoin',
    ]),
  },

  methods: {
    findTodayCoin() {
      // 0: "0.11"
      // 1: "KRW-BTC"
      // 2: "FALL"
      // 3: "비트코인"
      // 4: "11,635,000"
      // 5: "13,000"
      var zip = [];
      var tranlate = /\B(?=(\d{3})+(?!\d))/g // 1000원마다 , 찍어주는식
      for(var i=0; i<this.tradeAllcoin.length; i++){

        zip.push([this.tradeAllcoin[i][0], this.tradeAllcoin[i][1], this.tradeAllcoin[i][2], this.tradeAllcoin[i][3], (this.tradeAllcoin[i][4]).toString().replace(tranlate, ',')])
      }
      zip.sort(function (a, b) { return a[0]-b[0];}).reverse()

      // (조건문)
      // RISE 일때 highCoin
      // FALL 일때 lowCoin

      for(var i=0; i<zip.length; i++) {
        if(zip[i][2] === "RISE") {
          this.todayHighCoin.push([zip[i][0], zip[i][1], zip[i][2], zip[i][3], zip[i][4] ])
        } else {
          this.todayLowCoin.push([zip[i][0], zip[i][1], zip[i][2], zip[i][3], zip[i][4] ])
        }
      }

      // 7개 이후는 자르기
      this.todayHighCoin.splice(7)
      this.todayLowCoin.splice(7)
    }, // findTodayCoin 함수 끝

    findweekCoin() {
      // 0: "0.11"
      // 1: "KRW-BTC"
      // 2: "FALL"
      // 3: "비트코인"
      // 4: "11,635,000"
      // 5: "13,000"
      // this.tradeAllcoin.length
      var zip = [];
      var tranlate = /\B(?=(\d{3})+(?!\d))/g // 1000원마다 , 찍어주는식
      var eng = this.tradeAllcoin;
      var cal = [];
      const countPrice = i => {
        if(i<eng.length)
        {
          setTimeout(function() {
            axios.get('https://api.upbit.com/v1/candles/days?market='+eng[i][1]+'&count=10')
            .then(res => {

              // 코스피 전날 대비 증감% - ((현재가-전일종가)/전일종가 * 100).

              // 0: "104.74" - 전주 대비 증감%
              // 1: "스톰"
              // 2: "FALL"
              // 3: "KRW-STORM"
              // 4: "4.32"  - 현재 가격
              // 5: 2.11  - 1주일 전 가격

              if(i==0) {
                var changeNum = eng[0][4].replace(/,/gi,"")
                cal.push([((parseFloat(changeNum)-res.data[7].opening_price)/res.data[7].opening_price*100).toFixed(2), eng[0][3], eng[0][2], eng[0][1], eng[0][4], res.data[7].opening_price])

                i++;
                countPrice(i)
              } else {
                var changeNum = eng[i][4].replace(/,/gi,"")
                cal.push([((parseFloat(changeNum)-res.data[7].opening_price)/res.data[7].opening_price*100).toFixed(2), eng[i][3], eng[i][2], eng[i][1], eng[i][4], res.data[7].opening_price])

                i++;
                countPrice(i)
              }

            })


          }, 100) // setTimeout 함수 종료

        } else
        {
          this.weekTotal.push(cal)
          this.weekTotal[0].sort(function (a, b) { return a[0]-b[0];}).reverse()
          var divide = [];

          for(var i=0; i<this.weekTotal[0].length; i++) {
            divide.push([this.weekTotal[0][i][0], this.weekTotal[0][i][1], this.weekTotal[0][i][2], this.weekTotal[0][i][3], this.weekTotal[0][i][4], this.weekTotal[0][i][5] ])
          }
          console.log(divide)
          // 7개 이후는 자르기
          this.weekHighCoin = divide.slice(0, 7)
          this.weekLowCoin = divide.slice(divide.length-7).reverse()

          // console.log(this.weekHighCoin [0][0] > 0)
          // console.log(this.weekLowCoin[0][0] > 0)
        }
      }
      countPrice(0) // 0번째 코인부터 마지막 코인까지 꺼내기 위해 0부터 시작

    }, // findweekCoin 함수 끝

    drawChart(eng, index, total) {
      if(this.total != []) {
        this.total = []
        this.find = false
      }
      axios.get('https://api.upbit.com/v1/candles/months?market='+eng+'&count=70')
      .then(res => {
        // if(check == 'RISE') {
        //   this.nowPrice = this.highCoin[index]
        // } else {
        //   this.nowPrice = this.lowCoin[index]
        // }
        this.find = true

        for(var i=0; i<res.data.length; i++){
          this.total.push([res.data[i].candle_date_time_kst, res.data[i].opening_price, res.data[i].high_price, res.data[i].low_price, res.data[i].trade_price])
        }
        console.log(res.data)
        console.log(res.data[res.data.length-1].opening_price)
      })
    }, // drawChart 끝

  }, // methods 끝
  mounted() {
    this.findTodayCoin()
  }
}
</script>

<style scoped>
#ALL {
  background: #e9ecf1;
}
#main {
  background: #e9ecf1;
}

.top {
  margin-left: 2%;
  padding-top: 2%;
  font-size: 24px;
  background: #e9ecf1;
  width: 10%;
  height: 50px;
}

.price{
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
}

.left{
  width: 35%;
  background: white;
  margin: 1%;
  box-shadow: 2px 2px 4px #dee1e7;
}

.right{
  width: 35%;
  background: white;
  margin: 1%;
  text-align: left;
  box-shadow: 2px 2px 4px #dee1e7;
}
.coinInfo {
  width: 100%;
}

.up {
  color: #d60000;
}

.down {
  color: #0051c7;
}

tr {
  width: 100%;
}

.coinTitle {
  font-size: 18px;
  padding: 3%;
  border-bottom: 1px solid #d4d6dc;
}

.coinName {
  width: 50%;
}

.coinPrice {
  text-align: left;
  width: 25%;
}

.coinPercent {
  text-align: right;
  width: 25%;
}

.center {
  text-align: center;
}

table {
border-collapse: separate;
border-spacing: 15px 10px;
}

.name {
  color: black;
}

a {
  text-decoration:none;
  color: black
}
#a{
  width: 100%;
  margin-top: 2%;
  background: white;
}
</style>
