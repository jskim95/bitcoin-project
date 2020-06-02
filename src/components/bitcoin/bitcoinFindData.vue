<template>
  <div id="ALL">

    <div id="main">

      <div class="top">
        <strong>현재 시세</strong>
      </div>


      <div class="price">

        <div class="left">

          <div class="coinTitle">
            <strong>일간 상승 코인 순위</strong>
          </div>

          <table class="coinInfo">
            <tr v-on:click="drawChart(high[1], index, high[2], high[3])" v-for="(high, index) in highCoin">
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
            <tr class="down" v-on:click="drawChart(low[1], index, low[2], low[3])" v-for="(low, index) in lowCoin">
              <td class="coinName"><strong class="name"><a href="#a">{{low[3]}}</a></strong></td>
              <td class="down coinPrice">{{low[4]}}원</td>
              <td class="down coinPercent">-{{low[0]}}%</td>
            </tr>
          </table>

        </div>

      </div>

      <!-- <test></test> -->
      <div id="a">
        <bitcoin-chart v-bind:coinName="coinName" v-bind:nowPrice="nowPrice" v-bind:total="total" v-if="find===true" ></bitcoin-chart>
      </div>
      <!-- <bitcoin-chart id="a" v-bind:coinName="coinName" v-bind:total="total" v-if="find===true" ></bitcoin-chart> -->
    </div>

  </div>

</template>

<script>
var axios = require('axios')
var cheerio = require('cheerio')
import test from './test'
import bitcoinChart from './bitcoinChart'
export default {
  components: {
    test: test,
    bitcoinChart: bitcoinChart,
  },
  props:{
    allCoinKoreaName: {
      type: Array
    },
    allCoinEnglishName: {
      type: Array
    },
    coinCheck: {
      type: Array
    },
    coinPrice: {
      type: Array
    },
    coinChange: {
      type: Array
    },
  },
  data() {
    return {
      // 가장 많이 떨어진 코인 8개, 많이 오른 코인8개 추출하는 변수
      totalCheck: false,
      highCoin: [],
      lowCoin: [],

      // 차트에 데이터 보내는 변수
      find: false,
      total: [],
      coinName: '',
      nowPrice: [],
    }
  },
  methods: {
    findCoin() {
      var zip = [];
      var tranlate = /\B(?=(\d{3})+(?!\d))/g // 1000원마다 , 찍어주는식
      for(var i=0; i<this.allCoinEnglishName.length; i++){
        zip.push([(this.coinChange[0][i]*100).toFixed(2), this.allCoinEnglishName[i], this.coinCheck[0][i], this.allCoinKoreaName[i], (this.coinPrice[0][i]).toString().replace(tranlate, ',')])
      }
      zip.sort(function (a, b) { return a[0]-b[0];}).reverse()

      // (조건문)
      // RISE 일때 highCoin
      // FALL 일때 lowCoin
      for(var i=0; i<zip.length; i++) {
        if(zip[i][2] === "RISE") {
          this.highCoin.push([zip[i][0], zip[i][1], zip[i][2], zip[i][3], zip[i][4] ])
        } else {
          this.lowCoin.push([zip[i][0], zip[i][1], zip[i][2], zip[i][3], zip[i][4] ])
        }
      }
      // 7개 이후는 자르기
      this.highCoin.splice(7)
      this.lowCoin.splice(7)
    }, // findData 함수 끝

    drawChart(eng, index, check, kor) {
      if(this.total != []) {
        this.total = []
        this.find = false
      }
      axios.get('https://api.upbit.com/v1/candles/days?market='+eng+'&count=70')
      .then(res => {
        if(check == 'RISE') {
          this.nowPrice = this.highCoin[index]
        } else {
          this.nowPrice = this.lowCoin[index]
        }

        this.coinName = kor
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
    this.findCoin()
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
