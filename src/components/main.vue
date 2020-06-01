<template>
  <div id="ALL">
    <div id="phone">

      <div id="memu">



        <div id="mainTrade">
          <main-title></main-title>
        </div>

        <div id="mainWeather">

          <div class="nowTemperature">
            {{nowTemperature}}˚
          </div>

          <router-link to="weather">
            <div v-if='nowWeatherCheck[0]==="맑"'>
              <img src="../assets/mainsunny.png">
            </div>
            <div v-if='nowWeatherCheck[0]==="흐"'>
              <img src="../assets/mainCloudy.png">
            </div>
            <div v-if='nowWeatherCheck[0]==="구"'>
              <img src="../assets/mainLittleCloudy.png">
            </div>
            <div v-if='nowWeatherCheck[0]==="비"'>
              <img src="../assets/mainRaining.png">
            </div>
          </router-link>

          <div class="city">
            동작구
          </div>

          <div class="dust">
            미세먼지 : {{todayDust}}
          </div>
          <div class="dust">
            초미세먼지 : {{todayDDust}}
          </div>

          <!-- <now-weather></now-weather> -->
        </div>

        <div id="items">

          <div class="item">
            <router-link class="item" to="spanishWord"><img src="../assets/iconWordTest.png" /></router-link>
          </div>
          <div class="item">
            <router-link  class="item" to="weather"><img src="../assets/iconWeather.png" /></router-link>
          </div>

          <div class="item">
            <router-link  class="item" to="bitcoin"><img src="../assets/iconBitcoin.png" /></router-link>
          </div>
          <div class="item">
            <router-link  class="item" to="todo"><img src="../assets/iconTodo.png" /></router-link>
          </div>


        </div>



        <!-- <div>
          <router-link class="item" to="spanish">spanish</router-link>
        </div>
        <div>
          <router-link  class="item" to="trade">trade</router-link>
        </div> -->
        <div class="mainBackground">
          <img src="../assets/mainSunnyBackground.jpg">
        </div>
      </div>
      <div id="content">
        <router-view ></router-view>
      </div>
    </div>


  </div>
</template>

<script>
import mainTitle from './main/mainTitle'

import {createNamespacedHelpers} from 'vuex'
const nowWeather = createNamespacedHelpers('weather')

export default {
  // name: 'main',

  components:{
    'mainTitle': mainTitle,
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
    ...nowWeather.mapActions([
      'getData'
    ])
  }, // methods 끝

  mounted() {
    this.getData()
  },
}
</script>

<style scoped>
/* https://codepen.io/hexagoncircle/pen/XWbWKwL   버튼 css 예제 */
/* https://www.flaticon.com/free-icon/sun_606795?term=sun&page=1&position=1 */
 #ALL {
   width: 100%;
 }

 #phone {
   background: black;
 }

 #memu{
   margin-left: 5%;
   width: 91%;
 }

 .mainBackground img {
   width: 100%;
   height: 750px;
 }

 #mainTrade {
   position: absolute;
   width: 90%;
   margin-top: 2%;
 }

 #mainWeather {
   position: absolute;
   display: flex;
   flex-direction: column;
   text-align: center;
   width: 15%;
   margin-top: 6%;
   margin-left: 37%;
 }

 .nowTemperature {
   color: white;
   font-size: 120px;
   padding-left: 20%;
 }

 #mainWeather img{
   width: 100px;
   filter: invert(100%);
   padding-top: 3%;
   margin-right: 1%;
 }

 .city {
   color: white;
   padding-top: 9%;
   padding-bottom: 9%;
   font-size: 24px;
   margin-right: 3%;
 }

 .dust {
   color: white;
   padding-bottom: 5%;
 }

 #items {
   display: flex;
   flex-direction: row;
   position: absolute;
   margin-top: 42.5%;
   background: white;
   width: 90%;
   opacity: 0.7
 }
 .item {
   width: 100%;
   text-align: center;
 }
 .item img{
   width: 100px;
 }

 #content{
   position: absolute;
   width: 100%;
   /* margin-left: 5%; */
   margin-bottom: 10%;
 }

 p { margin: 7px 0px 8px 0px; line-height: 130%; }
</style>
