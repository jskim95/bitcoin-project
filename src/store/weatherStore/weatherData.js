var axios = require('axios')
var cheerio = require('cheerio')

const state = {
    nowTemperature: '12', // 현재 온도
    nowWeatherCheck: '흐림', // 맑음, 흐림 체크
    todayMin: '1', // 최저기온
    todayMax: '15', // 최고기온
    todayDust: '2', // 미세먼지
    todayDDust: '2', // 초미세먼지
    // test: 'testsadasdwe',
  }
  // vue의 computed와 비슷
  const getters = {

  }
  // state를 수정할 때 사용
  const mutations = {
    SET_TEMPERATURE(state, data) {
      state.nowTemperature = data
    },
    SET_WEATHERCHECK(state, data) {
      state.nowWeatherCheck = data
    },
    SET_TODAYMIN(state, data) {
      state.todayMin = data
    },
    SET_TODAYMAX(state, data) {
      state.todayMax = data
    },
    SET_TODAYDUST(state, data) {
      state.todayDust = data
    },
    SET_TODAYDDUST(state, data) {
      state.todayDDust = data
    },
  }
  // 비동기를 사용할 때, 또는 여러 mutations를 연달아 송출할 때
  const actions = {
    getData({state, commit}, data) {
      axios.get('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8')
      .then(res => {
        var $ = cheerio.load(res.data)
        commit('SET_TEMPERATURE', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > p > span.todaytemp').text())
        commit('SET_WEATHERCHECK', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(1) > p').text())
        commit('SET_TODAYMIN', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(2) > span.merge > span.min').text())
        commit('SET_TODAYMAX', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(2) > span.merge > span.max').text())
        commit('SET_TODAYDUST', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(2)').text())
        commit('SET_TODAYDDUST', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(4)').text())
      })
    },

  }


export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters,

};
