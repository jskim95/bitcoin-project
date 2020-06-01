<template>
  <div id="ALL">

      <div id="top">
        <div id="loadingTop"><strong>bitcoin</strong></div>
      </div>

      <div id="main">
        <loadingPage v-if="loaded==false"></loadingPage>
        
        {{coinCheck}}
        <router-view ></router-view>
      </div>

      <div id="bottom">
        hihi
      </div>

  </div>
</template>

<script>
import loadingPage from './bitcoinLoading.vue'

import {createNamespacedHelpers} from 'vuex'
const bitcoinData = createNamespacedHelpers('bitcoin')

export default {

  components:{
    'loadingPage':loadingPage,
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
    ])
  }, // methods 끝

  mounted() {
    this.allData()
  },
}
</script>

<style scoped>
/* https://codepen.io/hexagoncircle/pen/XWbWKwL   버튼 css 예제 */
/* https://www.flaticon.com/free-icon/sun_606795?term=sun&page=1&position=1 */

   #ALL {
     /* background: black; */
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
     /* position: absolute; */
     margin-top: 3%;
     margin-bottom: 2%;
     margin-left: 47.5%;
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
