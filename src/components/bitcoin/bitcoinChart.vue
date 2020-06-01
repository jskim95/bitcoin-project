<template>
  <div>

    <div class="RISE" v-if="this.nowPrice[2] == 'RISE'" v-bind:class="{'up': this.nowPrice[2] == 'RISE'}">

      <div class="coinTitle">
        <strong>{{this.coinName}}</strong>
        <span class="small">({{nowPrice[1]}})</span>
      </div>

      <div class="nowPrice">
        <span class="coinPrice"><strong>{{this.nowPrice[4]}}</strong></span><span class="kind">krw</span> <br />
        <span class="black">전일 대비</span>
        <span>+{{this.nowPrice[0]}}%</span>
        <span>▲{{change}}</span>
      </div>


    </div>

    <div class="FALL" v-if="this.nowPrice[2] == 'FALL'" v-bind:class="{'down': this.nowPrice[2] == 'FALL'}">

      <div class="coinTitle">
        <strong>{{this.coinName}}</strong>
        <span class="small">({{nowPrice[1]}})</span>
      </div>

      <div class="nowPrice">
        <span class="coinPrice"><strong>{{this.nowPrice[4]}}</strong></span><span class="kind">krw</span> <br />
        <span class="black">전일 대비</span>
        <span>+{{this.nowPrice[0]}}%</span>
        <span>▼{{change}}</span>
      </div>

    </div>

    <apexchart type="candlestick" height="350" :options="chartOptions" :series="series"></apexchart>

  </div>

</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'Chart',
  props:{
    total:{
      type: Array,
    },
    coinName:{
      type: String,
    },
    nowPrice:{
      type: Array,
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      now: parseFloat(this.nowPrice[4].replace(",","")),
      open: this.total[0][1],
      change : (parseFloat(this.nowPrice[4].replace(",",""))-this.total[0][1]).toFixed(2),
      series:
      [{
        data: this.total,
      }],

      chartOptions: {
        chart: {
          type: 'candlestick',
          height: 350
        },
        // title: {
        //   text: this.coinName,
        //   align: 'left'
        // },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: false
          }
        },

        plotOptions: {
          candlestick: {
            colors: {
              upward: '#F63107', // 상향 캔들 색상
              downward: '#0587FA', // 하향 캔들 색상
            },
            wick: {
              useFillColor:true, // fasle == 검정색 테두리
            }
          }
        } // plotOptions 끝

      }, // chartOptions 끝

    }
  },

}
</script>

<style scoped>

  .coinTitle {
    font-size: 22px;
    padding: 0.8%;
    color: black;
    border-bottom: 1px solid #d4d6dc;
  }

  .nowPrice {
    padding: 1%;
  }

  .black {
    color: black;
    font-size: 12px;
  }

  .small {
    font-size: 16px;
  }

  .up {
    color: #d60000;
  }

  .down {
    color: #0051c7;
  }

  .coinPrice {
    font-size: 36px;
  }
  .kind {
    font-size: 24px;
    margin-left: 0.5%;
  }
</style>
