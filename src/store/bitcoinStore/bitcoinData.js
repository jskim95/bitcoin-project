var axios = require('axios')
var cheerio = require('cheerio')

const state = {
    // nowTemperature: '12', // 현재 온도
    // nowWeatherCheck: '흐림', // 맑음, 흐림 체크
    allCoinEnglishName: [],
    allCoinKoreaName: [],
    coinCheck: [],
    coinPrice: [],
    coinChange: [],
    loaded: false,

  }
  // vue의 computed와 비슷
  const getters = {

  }
  // state를 수정할 때 사용
  const mutations = {
    // SET_TEMPERATURE(state, data) {
    //   state.nowTemperature = data
    // },
    // SET_WEATHERCHECK(state, data) {
    //   state.nowWeatherCheck = data
    // },

  }
  // 비동기를 사용할 때, 또는 여러 mutations를 연달아 송출할 때
  const actions = {
    // getData({state, commit}, data) {
    //   axios.get('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8')
    //   .then(res => {
    //     var $ = cheerio.load(res.data)
    //     commit('SET_TEMPERATURE', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > p > span.todaytemp').text())
    //     commit('SET_WEATHERCHECK', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(1) > p').text())
    //     commit('SET_TODAYMIN', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(2) > span.merge > span.min').text())
    //     commit('SET_TODAYMAX', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(2) > span.merge > span.max').text())
    //     commit('SET_TODAYDUST', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(2)').text())
    //     commit('SET_TODAYDDUST', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(4)').text())
    //   })
    // },

    allData({state, commit}, data){
      // 코인 영어, 한글이름 배열에 담기
      axios.get('https://api.upbit.com/v1/market/all')
      .then(res => {
        console.log(res)
        for(var i=0; i<res.data.length-1; i++){
          if(res.data[i].market[0] === 'K'){ // 한국 코인만 가져오기
            state.allCoinEnglishName.push(res.data[i].market)
            state.allCoinKoreaName.push(res.data[i].korean_name)
          }
        }

        // 2번째 axios요청에서 this.allCoinEnglishName[i]를 할수 없어서 임시로 배열 만듬
        var eng = state.allCoinEnglishName

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
            state.loaded = true
            state.coinPrice.push(price.split(","))
            state.coinChange.push(change.split(","))
            state.coinCheck.push(check.split(","))
          }
        }
        countPrice(0) // 0번째 코인부터 마지막 코인까지 꺼내기 위해 0부터 시작
    }) // 맨처음 axios 함수 괄호
    }, // allData 함수 끝

  }


export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters,

};
