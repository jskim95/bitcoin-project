<script>
import {Line} from 'vue-chartjs'
export default {
  extends: Line,
  props:{
    time: {
      type: Array,
    },
    temperature: {
      type: Array
    }
  },
  data() {
    return {
      datacollection: {
        labels: this.time, // 가로축 데이터
        datasets: [
          {
            label: '온도', // 차트 상단에 차트 이름
            data: this.temperature, // 세로축 데이터
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'white',

          }
        ]
      }, // chart데이터 끝

      options: {
        responsive: true,
        maintainAspectRatio: false, // 차트 width, height 크기조절

        legend:{
          display:false, // 차트 위에 label 표시 여부
        },

        tooltips: {
				enabled: false // 차트에 마우스 올렷을때 데이터 표시 여부
			  },

  			hover: {
  				animationDuration: 0
  			},

  			animation: { // 데이터 항상 표시
  				duration: 1,
  				onComplete: function () {
  					var chartInstance = this.chart,
  					ctx = chartInstance.ctx;
  					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
  					ctx.fillStyle = 'white';
  					ctx.textAlign = 'left';
  					ctx.textBaseline = 'bottom';

  					this.data.datasets.forEach(function (dataset, i) {
  						var meta = chartInstance.controller.getDatasetMeta(i);
  						meta.data.forEach(function (bar, index) {
  							var data = dataset.data[index];
  							ctx.fillText(data, bar._model.x, bar._model.y - 5);
  						});
  					});
  				}
  			},

        scales: {

          yAxes: [{
            display: false, // y축 기준 표시 여부
            ticks: { // y축 기준 데이터 변경
              // beginAtZero:true,
              min: 0, // y축 최소값
						  max: 40, // y축 최대값
              stepSize: 10, // y축 간격
						  fontSize : 12, // 글자크기
            },
            gridLines: {
              display: false, // 차트 안에 가로선 표시 여부
              drawBorder: false
            }
          }],

          xAxes: [{
            display: true,
            ticks: {
              fontSize : 12,
              fontColor : 'white',
              // margin: '200px',
              textAlign:'center',
            },
            gridLines:{
              display: false,
              drawBorder:false,
            }
          }]

        }, // scales 끝

      }, //옵션 끝

    } // 모든 data 끝
  },
  mounted(){
    this.renderChart(this.datacollection, this.options)
  }
}
</script>

<style scoped>

</style>
