<template>
  <div id="ALL">

    <div class="chart">
      <!-- <bitcoin-chart v-bind:coinName="coinName" v-bind:nowPrice="nowPrice" v-bind:total="total" v-if="find===true" ></bitcoin-chart> -->
    </div>

    <div class="coinType">

      <div class="coinTypeChoice">
        <a href="#" class="choice first">원화</a>
        <a href="#" class="choice">BTC</a>
        <a href="#" class="choice">USDT</a>
        <a href="#" class="choice">보유</a>
        <a href="#" class="choice">관심</a>
      </div>

      <div class="allCoin">
        <table class="coinTalble">
          <thead>
            <tr class="standard">
              <th>한글명</th>
              <th>현재가</th>
              <th>전일대비</th>
            </tr>
          </thead>
          <tbody>
            <tr class="coinInfo" v-for="coin in tradeAllcoin">

              <td class="coinName" style="width:40%">
                <img class="star" src="../assets/star.png" style="width:5%">
                <a class="coinKoreaName" v-on:click="drawChart(coin[1], index, coin[2], coin[3])" href="#">{{coin[3]}}</a>
                <p class="coinEnglishName">{{coin[1]}}</p>
              </td>

              <td class="coinPrice" v-bind:class="{'blue': coin[2]=='FALL'}">{{coin[4]}}</td>

              <td class="coinChange" v-if="coin[2] == 'RISE' || coin[2] == 'EVEN'">
                +{{coin[0]}}%
                <p class="changePrice" v-if="coin[5].length<3">{{coin[5]}}.00</p>
                <p class="changePrice" v-if="coin[5].length>=3">{{coin[5]}}</p>
              </td>
              <td class="coinFall" v-if="coin[2] == 'FALL'">
                -{{coin[0]}}%
                <p class="changePrice" v-if="coin[5].length<3">{{coin[5]}}.00</p>
                <p class="changePrice" v-if="coin[5].length>=3">{{coin[5]}}</p>
              </td>

            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>
import bitcoinChart from './bitcoin/bitcoinChart'

import {createNamespacedHelpers} from 'vuex'
const bitcoinData = createNamespacedHelpers('bitcoin')

export default {
  components: {
    bitcoinChart: bitcoinChart,
  },
  data() {
    return {
      // 차트에 데이터 보내는 변수
      // find: false,
      // total: [],
      // coinName: '',
      // nowPrice: [],
    }
  },
  computed:{
    ...bitcoinData.mapState([
      'tradeAllcoin'
    ])
  },
  // methods: {
  //   drawChart(eng, index, check, kor) {
  //     if(this.total != []) {
  //       this.total = []
  //       this.find = false
  //     }
  //     axios.get('https://api.upbit.com/v1/candles/days?market='+eng+'&count=70')
  //     .then(res => {
  //       if(check == 'RISE') {
  //         this.nowPrice = this.highCoin[index]
  //       } else {
  //         this.nowPrice = this.lowCoin[index]
  //       }
  //
  //       this.coinName = kor
  //       this.find = true
  //
  //       for(var i=0; i<res.data.length; i++){
  //         this.total.push([res.data[i].candle_date_time_kst, res.data[i].opening_price, res.data[i].high_price, res.data[i].low_price, res.data[i].trade_price])
  //       }
  //       console.log(res.data)
  //       console.log(res.data[res.data.length-1].opening_price)
  //     })
  //   }, // drawChart 끝
  // },

}
</script>

<style scoped>
  #ALL{
    display: flex;
    width: 100%;
    background-color: #e9ecf1;
  }

  .chart{
    background-color: white;
    width: 60%;
    min-height: 700px;
    margin-left: 5%;
  }

  .coinType{
    background-color: white;
    width: 30%;
    max-height: 700px;
    margin-left: 1%;
    overflow-x:hidden;
    overflow-y:scroll;
  }

  .coinTypeChoice{
    width: 100%;
    display: flex;
    border-top: 1px solid #d5d6dc;
    border-bottom: 1px solid #d5d6dc;
  }

  .choice {
    width: 20%;
    height: 40px;
    text-align: center;
    margin-top: 3%;
    color: #2b2b2b;
    text-decoration: none;
    font-weight: bold;
  }

  .first {
    border-bottom: 3px solid #115dcb;
    color: #115dcb;
  }

  .allCoin {
    width: 100%;
  }

  .coinTalble {
    width: 100%;
  }

  .standard {
    width: 100%;
    height: 50px;
    background-color: #f9fafc;
    color: #666;
    font-size: 11px;
  }

  .coinName {
    border-top: 1px solid #d5d6dc;
  }

  .coinKoreaName {
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 13px;
    text-align: center;
    margin-left: 10%;
  }

  .coinEnglishName {
    color: #666;
    font-size: 11px;
    text-align: left;
    margin-left: 25%;
  }
  .star {
    margin-left: 8%;
    margin-top: 5%;
  }
  .coinPrice {
    border-top: 1px solid #d5d6dc;
    width: 30%;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #d60000;
  }
  .coinChange {
    border-top: 1px solid #d5d6dc;
    letter-spacing: 1px;
    padding-top: 3%;
    width: 15%;
    text-align: center;
    font-size: 12px;
    font-weight: 550;
    color: #d60000;
  }
  .coinFall {
    border-top: 1px solid #d5d6dc;
    letter-spacing: 0.7px;
    padding-top: 3%;
    width: 15%;
    color: #0051c7;
    text-align: center;
    font-size: 12px;
    font-weight: 550;
  }
  .changePrice {
    text-align: right;
    margin-right: 15%;
  }



  .blue {
    color: #0051c7;
  }


  p { margin: 0px 0px 0px 0px; line-height: 120%; }
  table { border-spacing: 0px 0px 0px 0px;}
</style>
