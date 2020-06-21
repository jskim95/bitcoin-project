<template>
  <div id="ALL">
    <div id="main">

      <!-- ---------------------------------------------------일간 상승 코인 순위------------------------------------------------------ -->
      <div class="price">

        <div class="left">

          <div class="coinTitle">
            <strong>일간 상승 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr v-for="(high, index) in todayHighCoin">
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
            <tr class="down" v-for="(low, index) in todayLowCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{low[3]}}</a></strong></td>
              <td class="down coinPrice">{{low[4]}}원</td>
              <td class="down coinPercent">-{{low[0]}}%</td>
            </tr>
          </table>

        </div>

      </div>


      <!-- ---------------------------------------------------주간 상승 코인 순위------------------------------------------------------ -->

      <div class="loading" v-if="weekFind==false"></div>
      <div class="price" v-if="weekFind==true">

        <div class="left">

          <div class="coinTitle">
            <strong>주간 상승 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr v-for="(high, index) in weekHighCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{high[1]}}</a></strong></td>
              <td class="up coinPrice">{{high[4]}}원</td>
              <td class="up coinPercent">+{{high[0]}}%</td>
            </tr>
          </table>

        </div>

        <div class="right">

          <div class="coinTitle">
            <strong>주간 하락 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr class="down" v-for="(low, index) in weekLowCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{low[1]}}</a></strong></td>
              <td class="down coinPrice">{{low[4]}}원</td>
              <td class="down coinPercent">{{low[0]}}%</td>
            </tr>
          </table>

        </div>

      </div>

      <!-- ---------------------------------------------------월간 상승 코인 순위------------------------------------------------------ -->
      <div class="loading" v-if="monthFind==false && weekFind==true"></div>
      <div class="price" v-if="monthFind==true">

        <div class="left">

          <div class="coinTitle">
            <strong>월간 상승 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr v-for="(high, index) in monthHighCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{high[1]}}</a></strong></td>
              <td class="up coinPrice">{{high[4]}}원</td>
              <td class="up coinPercent">+{{high[0]}}%</td>
            </tr>
          </table>

        </div>

        <div class="right">

          <div class="coinTitle">
            <strong>월간 하락 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr class="down" v-for="(low, index) in monthLowCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{low[1]}}</a></strong></td>
              <td class="down coinPrice">{{low[4]}}원</td>
              <td class="down coinPercent">{{low[0]}}%</td>
            </tr>
          </table>

        </div>
      </div>

    </div> <!--  id = main -->
  </div> <!--  id = ALL -->
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
      monthHighCoin: [],
      monthLowCoin: [],

      total: [],
      weekTotal: [],
      monthTotal: [],
      weekFind: false,
      monthFind: false,
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
      // tradeAllcoin 변수 정보

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

              // cal 변수 정보
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
          // 0: "82.03" - 전주 대비 증감%
          // 1: "스톰"
          // 2: "RISE"
          // 3: "KRW-STORM"
          // 4: "3.95" - 현재 가격
          // 5: 2.17   - 1주일 전 가격
          this.weekHighCoin = divide.slice(0, 7)
          this.weekLowCoin = divide.slice(divide.length-7).reverse()
          if(this.weekHighCoin != []) {
            this.weekFind = true
            this.findMonthCoin()
          }
          console.log(this.weekHighCoin)
          console.log(this.weekLowCoin)
        }
      }
      countPrice(0) // 0번째 코인부터 마지막 코인까지 꺼내기 위해 0부터 시작

    }, // findweekCoin 함수 끝

    findMonthCoin() {
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
            axios.get('https://api.upbit.com/v1/candles/days?market='+eng[i][1]+'&count=31')
            .then(res2 => {
              // 코스피 전날 대비 증감% - ((현재가-전일종가)/전일종가 * 100).

              // cal 변수 정보
              // 0: "104.74" - 전주 대비 증감%
              // 1: "스톰"
              // 2: "FALL"
              // 3: "KRW-STORM"
              // 4: "4.32"  - 현재 가격
              // 5: 2.11  - 1주일 전 가격
              if(i==0) {
                var changeNum = eng[0][4].replace(/,/gi,"")
                cal.push([((parseFloat(changeNum)-res2.data[30].opening_price)/res2.data[30].opening_price*100).toFixed(2), eng[0][3], eng[0][2], eng[0][1], eng[0][4], res2.data[30].opening_price])

                i++;
                countPrice(i)
              } else {
                var changeNum = eng[i][4].replace(/,/gi,"")
                cal.push([((parseFloat(changeNum)-res2.data[30].opening_price)/res2.data[30].opening_price*100).toFixed(2), eng[i][3], eng[i][2], eng[i][1], eng[i][4], res2.data[30].opening_price])

                i++;
                countPrice(i)
              }

            })


          }, 200) // setTimeout 함수 종료

        } else
        {

          this.monthTotal.push(cal)
          this.monthTotal[0].sort(function (a, b) { return a[0]-b[0];}).reverse()
          var divide = [];

          for(var i=0; i<this.monthTotal[0].length; i++) {
            divide.push([this.monthTotal[0][i][0], this.monthTotal[0][i][1], this.monthTotal[0][i][2], this.monthTotal[0][i][3], this.monthTotal[0][i][4], this.monthTotal[0][i][5] ])
          }

          // 7개 이후는 자르기
          // 0: "82.03" - 전주 대비 증감%
          // 1: "스톰"
          // 2: "RISE"
          // 3: "KRW-STORM"
          // 4: "3.95" - 현재 가격
          // 5: 2.17   - 1주일 전 가격
          this.monthHighCoin = divide.slice(0, 7)
          this.monthLowCoin = divide.slice(divide.length-7).reverse()
          if(this.monthHighCoin != []) {
            this.monthFind = true
          }
          console.log(this.monthHighCoin)
          console.log(this.monthLowCoin)
        }
      }
      countPrice(0) // 0번째 코인부터 마지막 코인까지 꺼내기 위해 0부터 시작

    }, // findweekCoin 함수 끝

  }, // methods 끝
  mounted() {
    this.findTodayCoin()
    this.findweekCoin()
    // this.findMonthCoin()
  }
}
</script>

<style scoped>
#ALL {
  background: #e9ecf1;
}
#main {
  background: #e9ecf1;
  min-height: 800px;
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

.loading{
  /* position: absolute; */
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 47.5%;
  width: 40px;
  height: 40px;
  border: 5px solid #093687;
  border-color: #093687 transparent transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite
}
@keyframes spin {
  100% { transform: rotate(360deg);}
}
</style>
