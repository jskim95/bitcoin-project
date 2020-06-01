<template>
  <div id="ALL">
    <div id="bitcoin_box">

      <div id="loadingTop"><strong>bitcoin</strong></div>

      <div id="loadingMain" v-if="loaded===false">
        <img class="loadingLogo" src="../assets/loadingLogo.png">

        <div class="loadingText">
          <span class="big"><strong>잠시만 기다려주세요.</strong></span><br /><br />
          <span class="small">보안을 위해 브라우저를 확인 중입니다.</span><br />
          <span class="small">이 과정은 자동으로 진행되며, 약 5초정도 소요됩니다.</span><br />
        </div>

        <div class="loading"></div>
      </div>

      <div class="test">
        <find-data v-bind:coinCheck="coinCheck" v-bind:coinPrice="coinPrice" v-bind:coinChange="coinChange" v-bind:allCoinEnglishName="allCoinEnglishName" v-bind:allCoinKoreaName="allCoinKoreaName" v-if="loaded"></find-data>
      </div>

    </div>



  </div>
</template>

<script>
var axios = require('axios')
var cheerio = require('cheerio')
import findData from './bitcoin/bitcoinFindData'

export default {
  components:{
    findData,
  },
  data() {
    return {
      allCoinEnglishName: [],
      allCoinKoreaName: [],
      coinCheck: [],
      coinPrice: [],
      coinChange: [],
      loaded: false,
    }
  },
  methods: {
    allData(){
      // 코인 영어, 한글이름 배열에 담기
      axios.get('https://api.upbit.com/v1/market/all')
      .then(res => {
        for(var i=0; i<res.data.length-1; i++){
          if(res.data[i].market[0] === 'K'){ // 한국 코인만 가져오기
            this.allCoinEnglishName.push(res.data[i].market)
            this.allCoinKoreaName.push(res.data[i].korean_name)
          }
        }

        // 2번째 axios요청에서 this.allCoinEnglishName[i]를 할수 없어서 임시로 배열 만듬
        var eng = this.allCoinEnglishName

        // 2번째 axios요청에서 .push를 인식 못해서 문자열로 더해서 만든후 .split(",")로 배열로 바꿔서 변수에 넣음
        var price = '';
        var change = '';
        var check = '';

        const countPrice = i => {

          if(i<eng.length+1)
          {
            setTimeout(function() {

              axios.get('https://api.upbit.com/v1/ticker?markets='+eng[i])
              .then(res2 => {
                console.log(res2)
                const data = res2.data[0];
                price += res2.data[0].trade_price+","
                change += res2.data[0].change_rate+","
                check += res2.data[0].change+","
              })

              i++;
              countPrice(i)
            }, 150) // setTimeout 함수 종료
          } else
          {
            console.log("실행??")
            this.loaded = true
            this.coinPrice.push(price.split(","))
            this.coinChange.push(change.split(","))
            this.coinCheck.push(check.split(","))
          }
        }
        countPrice(0) // 0번째 코인부터 마지막 코인까지 꺼내기 위해 0부터 시작
    }) // 맨처음 axios 함수 괄호
    }, // allData 함수 끝

  }, // methods 끝

  mounted() {
    this.allData()
  }
}
</script>

<style scoped>

  #ALL {
    background: black;
  }

  #bitcoin_box {
    margin-left: 5%;
    width: 90%;
    min-height: 740px;
    background: white;
  }

  #loadingTop {
    height: 50px;
    font-size: 24px;
    color: white;
    background-color: #093687;
    padding-left: 2%;
    padding-top: 1%;
  }

  #loadingMain {
    padding-top: 8%;
    text-align: center;
  }

  .loadingText {

  }

  .big {
    font-size: 48px;
    color: #093687;
  }
  .small {
    padding-top: 50%;
    color: gray;
  }



  .loading{
    position: absolute;
    margin-top: 5%;
    margin-left: 42.5%;
    width: 50px;
    height: 50px;
    border: 5px solid #093687;
    border-color: #093687 transparent transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite
  }
  @keyframes spin {
    100% { transform: rotate(360deg);}
  }

  .total{
    display: block;
    /* width: 1000px; */
    margin-left: 15px;
  }
</style>
