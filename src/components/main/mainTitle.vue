<template>
  <div >

    <div class="total">

      <div class="korea">
        <span>코스피</span>
        <strong>{{koreaPrice}}</strong>
        <span class="up" v-if="koreaCheck ==='상승'">
           ▲ {{koreaChange}} + ({{koreaPercent}}%)
        </span>
        <span class="down" v-else-if="koreaCheck ==='하락'">
          {{koreaPrice}} ▼ {{koreaChange}} - ({{koreaPercent}}%)
        </span>
      </div>

      <div class="america">
        <span>나스닥</span>
        <strong>{{americaPrice}}</strong>
        <span class="up" v-if="americaCheck ==='상승'">
           ▲ {{americaChange}} + ({{americaPercent}}%)
        </span>
        <span class="down" v-else-if="americaCheck ==='하락'">
           ▼ {{americaChange}} - ({{americaPercent}}%)
        </span>
      </div>

      <div class="bit">
        <!-- <div class="bitLink">
          <router-link to="bitcoin">비트코인</router-link>
        </div> -->
        <span>비트코인</span>
        <strong>{{bitPrice}}</strong>
        <span class="up" v-if="bitCheck ==='RISE'">
           ▲ {{bitChange}} + ({{bitPercent}}%)
        </span>
        <span class="down" v-else-if="bitCheck ==='FALL'">
           ▼ {{bitChange}} - ({{bitPercent}}%)
        </span>
      </div>

    </div>

  </div>





</template>

<script>
var axios = require('axios')
var cheerio = require('cheerio')

export default {

  data() {
    return {
      loaded: false,
      koreaPrice: '',
      koreaChange: [],
      koreaCheck: '',
      koreaPercent:'',

      americaPrice: '',
      americaChange: [],
      americaCheck: '',
      americaPercent: '',

      bitPrice: '',
      bitChange: '',
      bitCheck: '',
      bitPercent: '',
    }
  },
  methods: {
    koreaData(){
      axios.get('https://finance.naver.com/sise/sise_index.nhn?code=KOSPI')
      .then(res => {
        var $ = cheerio.load(res.data)
        this.loaded = true
        // 코스피 현재 가격
        this.koreaPrice = $('#now_value').text().split(',')
        this.koreaPrice = parseFloat(this.koreaPrice[0]+this.koreaPrice[1])

        // 코스피 수치 증감
        var beforeFilter = $('#change_value_and_rate > span').text()
        this.koreaChange = parseFloat(beforeFilter.substring(0,(beforeFilter.length-2)))

        // 코스피 상승, 하락 구분
        this.koreaCheck = beforeFilter.substring((beforeFilter.length-2), (beforeFilter.length))

        // 코스피 전날 대비 증감% - ((현재가-전일종가)/전일종가 * 100).
        // this.koreaPercent = parseFloat(this.koreaChange)/parseFloat(this.koreaPrice)
        if(this.koreaCheck === '하락'){
          this.koreaPercent = ((this.koreaPrice-(this.koreaPrice+this.koreaChange)) / (this.koreaPrice + this.koreaChange)*100).toFixed(2)
        } else if(this.koreaCheck === '상승'){
          this.koreaPercent = ((this.koreaPrice-(this.koreaPrice-this.koreaChange)) / (this.koreaPrice - this.koreaChange)*100).toFixed(2)
        }

      })
    }, // 코스피 함수 끝

    americaData(){
      axios.get('https://finance.naver.com/world/sise.nhn?symbol=NAS@IXIC')
      .then(res => {
        var $ = cheerio.load(res.data)
        this.loaded = true
        // 나스닥 현재 가격
        this.americaPrice = $('#content > div.rate_info > div.today > p.no_today > em').text().split(',')
        this.americaPrice = parseFloat(this.americaPrice[0]+this.americaPrice[1])

        // 나스닥 수치 증감
        this.americaChange = $('#content > div.rate_info > div.today > p.no_exday > em:nth-child(2)').text()
        this.americaChange = parseFloat(this.americaChange)
        // 나스닥 상승, 하락 구분
        var beforeCheck = $('#content > div.rate_info > div.today > p.no_exday > em:nth-child(3) > span:nth-child(2)').text()
        if(beforeCheck === '+'){
          this.americaCheck = '상승'
        } else if (beforeCheck === '-'){
          this.americaCheck = '하락'
        }

        // 코스피 전날 대비 증감% - ((현재가-전일종가)/전일종가 * 100).
        // this.koreaPercent = parseFloat(this.koreaChange)/parseFloat(this.koreaPrice)
        if(this.americaCheck === '하락'){
          this.americaPercent = ((this.americaPrice-(this.americaPrice+this.americaChange)) / (this.americaPrice + this.americaChange)*100).toFixed(2)
        } else if(this.americaCheck === '상승') {
          this.americaPercent = ((this.americaPrice-(this.americaPrice-this.americaChange)) / (this.americaPrice - this.americaChange)*100).toFixed(2)
        }

      })
    }, // 나스닥 함수 끝

    bitCoin(){
      axios.get('https://api.upbit.com/v1/ticker?markets=KRW-BTC')
      .then(res => {
        this.loaded = true
        var bit = res.data[0]
        // console.log(bit)
        var tranlate = /\B(?=(\d{3})+(?!\d))/g // 1000원마다 , 찍어주는식
        this.bitPrice = bit.trade_price.toString().replace(tranlate, ',')
        this.bitChange = bit.change_price
        this.bitCheck = bit.change
        this.bitPercent = (bit.change_rate*100).toFixed(2)

      })
    }, // bitCoin함수 끝
  }, // methods 끝

  mounted(){
    this.koreaData()
    this.americaData()
    this.bitCoin()
  },
}
</script>

<style scoped>
 .up{
   color: red;
 }
 .down{
   color: blue;
 }
 strong{
   font-size: 18px;
 }
 .total{
   width: 100%;
   display: flex;
   flex-direction: row;
   text-align: center;
   background-color: white;
   height: 35px;
   opacity: 0.7
 }
 .america{
   width: 33%;
   padding-top: 10px;
   padding-bottom: 10px;
   border-left: 1.5px solid black;
 }
 .korea{
   width: 33%;
   padding-top: 10px;
   border-left: 1.5px solid black;
 }
 .bit{
   width: 33%;
   padding-top: 10px;
   border-left: 1.5px solid black;
 }
 .bitLink a{
   color: black;
   text-decoration: none;

 }

</style>
