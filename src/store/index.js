import Vue from 'vue'
import Vuex from 'vuex'

import wordStore from './wordStore/spanishWord'
import weatherStore from './weatherStore/weatherData'
import bitcoinStore from './bitcoinStore/bitcoinData'
import tradeStore from './tradeStore/tradeData'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        spanish: wordStore,
        weather: weatherStore,
        bitcoin: bitcoinStore,
        trade: tradeStore,
    }
})
