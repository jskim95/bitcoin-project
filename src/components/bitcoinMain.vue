<template>
  <div id="ALL">

    <div class="mainBackground">

      <div class="mainBackgroundContent">
        <h1>가장 신뢰받는 글로벌 표준 디지털 자산 거래소</h1>
        <p class="">안전하고 투명한 시스템으로 빠르고 편리한 거래 환경을 제공합니다.</p>

        <div class="coinNumber">
          <div class="coin">
            <span class="blue">{{allCoinEnglishName.length}}</span><br>
            <span class="gray left">Coins</span>
          </div>
          <div class="market">
            <span class="blue">{{allCoin}}</span><br>
            <span class="gray right">Markets</span>
          </div>
        </div>

        <div class="moveButton">
          <div class="moveTrade">
            거래소 둘러보기
          </div>
          <div class="moveLogin">
            로그인
          </div>
        </div>

      </div>

      <img src="../assets/mainBackground.png">
    </div>

    <div class="warning">
      <img src="../assets/mainWarning.png">
    </div>

    <div class="total">

      <div class="korea">

        <div class="coinName">
          <span>KOSPI</span>
          <p class="coinDetail">trade Kospi Index</p>
        </div>

        <div class="coinInfo">
            <span class="up" v-if="koreaCheck ==='상승'">
              <span class="coinPrice">{{koreaPrice}}</span> <br>
              <span class="coinPercent">
                 ▲ {{koreaChange}} +({{koreaPercent}}%)
              </span>
            </span>

            <span class="down" v-else-if="koreaCheck ==='하락'">
              <span class="coinPrice">{{koreaPrice}}</span> <br>
              <span class="coinPercent">
                 ▼ {{koreaChange}} -({{koreaPercent}}%)
              </span>
            </span>
        </div>

      </div>

      <div class="america">
        <div class="coinName">
          <span>NASDAQ</span>
          <p class="coinDetail">trade Nasdaq Index</p>
        </div>

        <span class="up" v-if="americaCheck ==='상승'">
          <span class="coinPrice">{{americaPrice}}</span> <br>
          <span class="coinPercent">
             ▲ {{americaChange}} +({{americaPercent}}%)
          </span>
        </span>

        <span class="down" v-else-if="americaCheck ==='하락'">
          <span class="coinPrice">{{americaPrice}}</span> <br>
          <span class="coinPercent">
             ▼ {{americaChange}} -({{americaPercent}}%)
          </span>
        </span>

      </div>

      <div class="bit">
        <div class="coinName">
          <span>BITCOIN</span>
          <p class="coinDetail">trade Bitcoin Index</p>
        </div>

        <div class="coinInfo">
            <span class="up" v-if="bitCheck ==='RISE'">
              <span class="coinPrice">{{bitPrice}}</span> <br>
              <span class="coinPercent">
                 ▲ {{bitChange}} +({{bitPercent}}%)
              </span>
            </span>

            <span class="down" v-else-if="bitCheck ==='FALL'">
              <span class="coinPrice">{{bitPrice}}</span> <br>
              <span class="coinPercent">
                 ▼ {{bitChange}} -({{bitPercent}}%)
              </span>
            </span>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

import {createNamespacedHelpers} from 'vuex'
const tradeData = createNamespacedHelpers('trade')
const bitcoinData = createNamespacedHelpers('bitcoin')

export default {
  computed: {
    ...tradeData.mapState([
      'tradeLoaded',
      'koreaPrice',
      'koreaChange',
      'koreaCheck',
      'koreaPercent',

      'americaPrice',
      'americaChange',
      'americaCheck',
      'americaPercent',

      'bitPrice',
      'bitChange',
      'bitCheck',
      'bitPercent',


    ]),
    ...bitcoinData.mapState([
      'allCoinEnglishName',
      'allCoin',
    ]),
  },

  methods: {
    ...tradeData.mapActions([
      'koreaData',
      'americaData',
      'bitCoin',
    ]),
  },

  mounted() {
    this.koreaData()
    this.americaData()
    this.bitCoin()
  }
}
</script>

<style scoped>
  #mainBackground {
    position: relative;
  }
  .mainBackground img{
    width: 100%;
    height: 400px;
    opacity: 0.7;
    z-index: 1;
  }
  .mainBackgroundContent {
    position: absolute;
    font-weight: bold;
    width: 100%;
    margin-top: 2%;
    text-align: center;
    color: black;
    z-index: 2;
  }
  .coinNumber {
    width: 100%;
    margin-top: 3%;
    display: flex;
  }
  .coin {
    width: 50%;
    text-align: right;
    border-right: 1.2px solid #74AFF7;
    padding-right: 1%;
  }
  .market {
    width: 50%;
    text-align: left;
    padding-left: 1%;
  }
  .blue {
    font-size: 48px;
    color: #093687;
    margin-right: 1.5%;
  }
  .gray {
    font-size: 17px;
    color: #7588aa
  }
  .left {
    margin-right: 2.5%;
  }
  .right {
    margin-left: 1.5%;
  }
  .moveButton {
    width: 100%;
    font-size: 17px;
    display: flex;
    margin-top: 2%;
    padding-left: 39.7%;
  }
  .moveTrade {
    color: white;
    width: 130px;
    /* height: 40px; */
    padding: 0.8%;
    margin-right: 0.5%;
    background-color: #0062df;
  }
  .moveLogin {
    color: white;
    width: 130px;
    /* height: 40px; */
    padding: 0.5%;
    padding-top: 0.7%;
    background-color: #093687;
  }
  .warning {
    background: #2b2b2b
  }

  /* 코스피, 나스닥, 비트코인 가격 */
  .total{
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #f4f5f8;
    height: 200px;
    margin-top: 3%;
  }

  .america{
    width: 33%;
    display: flex;
  }

  .korea{
    width: 33%;
    margin-left: 5%;
    display: flex;
  }

  .bit{
    width: 33%;
    display: flex;
  }

  .coinName{
    width: 50%;
    font-size: 30px;
    /* font-weight: bold; */
    font-family: inherit;
  }

  .coinDetail{
    font-size: 16px;
    color: #666;

  }

  .right {
    text-align: right;
  }

  .coinPrice{
    font-size: 30px;
  }

  .coinPercent{
    font-size: 16px;
  }

  .up{
    color: red;
  }
  .down{
    color: blue;
  }
  strong{
    font-size: 18px;
  }
  p { margin: 5px 0px 8px 0px; line-height: 120%; }




</style>
