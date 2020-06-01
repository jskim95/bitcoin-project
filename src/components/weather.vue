<template>
  <div id="all">
    <div id="weather_box">

      <div id="top">
        <p class="city">동작구</p>
        <p class="time">{{nowDay}}{{nowTime}}</p>

        <div class="nowTemperature" v-if='nowWeatherCheck[0]==="맑"'>
          <img src="../assets/mainsunny.png">
          <span>{{nowTemperature}}˚</span>
        </div>
        <div class="nowTemperature" v-if='nowWeatherCheck[0]==="흐"'>
          <img src="../assets/mainCloudy.png">
          <span>{{nowTemperature}}˚</span>
        </div>
        <div class="nowTemperature" v-if='nowWeatherCheck[0]==="구"'>
          <img src="../assets/mainLittleCloudy.png">
          <span>{{nowTemperature}}˚</span>
        </div>
        <div class="nowTemperature" v-if='nowWeatherCheck[0]==="비"'>
          <img src="../assets/mainRaining.png">
          <span>{{nowTemperature}}˚</span>
        </div>

        <div id="detailInformation">

            <p class="big">
              <span>{{nowWeatherCheck}}</span>
              <span class="min">{{todayMin}}</span>
              <span>/</span>
              <span class="max">{{todayMax}}</span>
            </p>

            <div class="smaill">
              <span>미세먼지 : {{todayDust}}</span>
              <br />
              <span>초미세먼지 : {{todayDDust}}</span>
            </div>

        </div>

      </div>

      <div id="weatherPictures">
        <div class="weatherPicture" v-for="(weather, index) in weather">
          <a v-if="weather === '맑음'">
            <img src='../assets/sunny.png'>
          </a>
          <a v-if="weather === '흐림'">
            <img src='../assets/cloudy.png'>
          </a>
          <a v-if="weather === '구름많음'">
            <img src='../assets/little-cloud.png'>
          </a>
          <a v-if="weather === '비'">
            <img src="../assets/rain.png">
          </a>
        </div>
      </div>

    <weather-chart v-bind:class="size" v-bind:weather="weather" v-bind:time="time" v-bind:temperature="temperature" v-if="loaded"/>

      <div id="weatherBackground">
        <img src="../assets/weatherBackground.jpg">
      </div>

    </div>

  </div>
</template>

<script>
import {Line} from 'vue-chartjs'
import weatherChart from './weather/weatherChart'

import {createNamespacedHelpers} from 'vuex'
const nowWeather = createNamespacedHelpers('weather')

var axios = require('axios')
var cheerio = require('cheerio');

export default {

  extends: Line,
  components:{
    weatherChart
  },

  data() {
    return {
      number : '',
      temperature : [],
      weather: [],
      time : [],
      loaded: false,
      size: 'weatherChart',

      nowDay: '',
      nowTime: '',
    }
  },

  computed:{
    ...nowWeather.mapState([
      'nowTemperature',
      'nowWeatherCheck',
      'todayMin',
      'todayMax',
      'todayDust',
      'todayDDust',
    ])
  },

  methods: {
    getData() {
      axios.get('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8')
      .then(res => {
        var $ = cheerio.load(res.data)
        this.loaded = true
        var number = $("#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.table_info.bytime._todayWeatherByTime > div.info_list.weather_condition._tabContent > ul > li").length
        this.number = number
        for(var i=1; i<=number; i++){
          this.temperature.push($("#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.table_info.bytime._todayWeatherByTime > div.info_list.weather_condition._tabContent > ul > li:nth-child("+i+") > dl > dd.weather_item._dotWrapper > span:nth-child(1)").text())
        }
        for(var i=1; i<=number; i++){
          this.weather.push($("#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.table_info.bytime._todayWeatherByTime > div.info_list.weather_condition._tabContent > ul > li:nth-child("+i+") > dl > dd.item_condition > span").text())
        }
        for(var i=1; i<=number; i++){
          this.time.push($("#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.table_info.bytime._todayWeatherByTime > div.info_list.weather_condition._tabContent > ul > li:nth-child("+i+") > dl > dd.item_time > span").text())
        }
      }) // axios 끝
    }, // getData함수 끝
    getTime() {
      // 시간
      var today = new Date();
      this.nowTime = today.toLocaleTimeString().slice(0,8)

      // 요일
      var month = today.getMonth() + 1;  // 월
      var date = today.getDate();  // 날짜
      var day = today.getDay(); // 요일
      var days = ['일', '월', '화', '수', '목', '금', '토',]

      this.nowDay += month+"월 "
      this.nowDay += date+"일 "
      this.nowDay += days[day]+"요일 "
    }
  }, // methods 끝

  mounted(){
    this.getData()
    this.getTime()
  }
}
</script>

<style scoped>

  #all {
    background: black;
  }

  #weather_box {
    margin-left: 5%;
    width: 90%;
    background: white;
  }

  #weatherBackground img{
    width: 100%;
    min-height: 900px;
  }


  #top {
    position: absolute;
    margin-top: 4%;
    width: 90%;
    text-align: center;
    color: white;
  }

  .city {
    font-size: 36px;
  }
  .time {
    font-size: 24px;
    opacity: 0.5
  }

  #top img {
    filter: invert(100%);
    width: 7%;
    height: auto;
    margin-right: 2%;
    margin-top: 3%;
  }

  .nowTemperature {
    margin-right: 8%;
    margin-top: 2%;
  }

  .nowTemperature span {
    position: absolute;
    font-size: 110px;
  }

  #detailInformation {
    margin-top: 2%;
  }

  .min {
    color: blue;
    opacity: 0.7;
  }

  .max {
    color: red;
    opacity: 0.7;
  }
  .big {
    font-size: 19px;
  }
  .smaill {
    font-size: 17px;
  }

  .weatherChart{
    position: absolute;
    padding-top: 37%;
    height: 150px;
    width: 70%;
    margin-left: 10%;
  }

  #weatherPictures {
    width: 80%;
    position: absolute;
    margin-top: 43%;
    display: flex;
    flex-direction: row;
    margin-left: 10%;
  }

  .weatherPicture {
    width: 12.1%;
    /* margin-top: 5%; */

  }

  /* .weatherPicture img{
    width: 11.5%;
  } */

  img{
    width: 30px;
    height: 30px;
  }
  #total > div:nth-child(3) > div > div > div:nth-child(2) {
    /* padding-left: 5px; */
  }
</style>
