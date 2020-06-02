<template>
  <div id="ALL">

      <div class="top" v-bind:class="{'loadingTop': linkCheck == true}">

        <span class="home" v-on:click="moveHome" >

          <span v-if="linkCheck==false" class="homeButton" >
            <router-link to="/">bitcoin</router-link>
          </span>

          <span v-if="linkCheck==true" class="homeMoveButton" >
            <router-link to="/">bitcoin</router-link>
          </span>

        </span>

          <span class="menu" v-on:click="moveMenu" v-bind:class="{'topButton': linkCheck == true}">
            <span class="link">
              <router-link to="weather" class="link">거래소</router-link>
            </span>
            <span class="link">
              <router-link to="weather" class="link">입출금</router-link>
            </span>
            <span class="link">
              <router-link to="weather" class="link">투자내역</router-link>
            </span>
            <span class="link">
              <router-link to="weather" class="link">코인동향</router-link>
            </span>
          </span>


      </div>

      <div id="main">
        <div class="">
          <loadingPage v-if="loaded==false"></loadingPage>
        </div>

        <div v-if="linkCheck==false && loaded==true">
          <bitcoinMain></bitcoinMain>
        </div>

        <div v-if="linkCheck==true">
          <router-view></router-view>
        </div>


      </div>

      <div id="bottom">
      </div>

  </div>
</template>

<script>
import loadingPage from './bitcoinLoading.vue'
import bitcoinMain from './bitcoinMain.vue'

import {createNamespacedHelpers} from 'vuex'
const bitcoinData = createNamespacedHelpers('bitcoin')

export default {

  components:{
    'loadingPage':loadingPage,
    'bitcoinMain':bitcoinMain,
  },

  data() {
    return {
      linkCheck:false
    }
  },

  computed:{
    ...bitcoinData.mapState([
      'allCoinEnglishName',
      'allCoinKoreaName',
      'coinCheck',
      'coinPrice',
      'coinChange',
      'loaded',
    ])
  },

  methods: {
    ...bitcoinData.mapActions([
      'allData'
    ]),
    moveMenu() {
      this.linkCheck = true;
    },
    moveHome() {
      this.linkCheck = false;
    },
  }, // methods 끝

  mounted() {
    this.allData()
  },
}
</script>

<style scoped>
/* https://codepen.io/hexagoncircle/pen/XWbWKwL   버튼 css 예제 */
/* https://www.flaticon.com/free-icon/sun_606795?term=sun&page=1&position=1 */
   /* #e9ecf1;  진한 회색 */
   /* #f4f5f8;  연한 회색 */
   /* #093687;  업비트 파란색 배경 */
   /* #0062df;  업비트 파란색 글자 */
   #ALL {
     background: white; /* 진한 회색 */
   }

   .top {
     height: 50px;
     font-size: 24px;
     background-color: #f4f5f8; /* 연한 회색 */
     padding-left: 2%;
     padding-top: 1%;
   }

   .loadingTop {
     height: 50px;
     background-color: #093687; /* 업비트 파란색 배경 */
     padding-left: 2%;
     padding-top: 1%;
   }

   .topButton a {
     color: white;
   }
   .homeMoveButton a {
     font-size: 30px;
     font-weight: bold;
     color: white;
     text-decoration: none;
   }

   .homeButton a{
     font-size: 30px;
     font-weight: bold;
     color: #0062df; /* 업비트 파란색 글자 */
     text-decoration: none;
   }

   .link {
     font-size: 17px;
     font-weight: bold;
     color: #2b2b2b;
     padding-left: 10px;
     text-decoration: none;
   }

   .home {
     margin-right: 5%;
   }


</style>
