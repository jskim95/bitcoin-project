import Vue from 'vue'
import Vuex from 'vuex'


import bitcoinStore from './bitcoinStore/bitcoinData'
import tradeStore from './tradeStore/tradeData'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        bitcoin: bitcoinStore,
        trade: tradeStore,
    }
})
