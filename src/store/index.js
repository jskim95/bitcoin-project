import Vue from 'vue'
import Vuex from 'vuex'

import wordStore from './wordStore/spanishWord'
import weatherStore from './weatherStore/weatherData'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        spanish: wordStore,
        weather: weatherStore,
    }
})
