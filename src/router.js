import Vue from 'vue'
import Router from 'vue-router'
import main from './components/main'
import bitcoinTrade from './components/bitcoinTrade'
import bitcoinLogin from './components/bitcoinLogin'
import bitcoinAnalysis from './components/bitcoinAnalysis'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes : [
    {
      path:'/',
      name:'main',
      component:main,
      children: [
        {
          path:'bitcoinTrade',
          component:bitcoinTrade
        },
        {
          path:'bitcoinLogin',
          component:bitcoinLogin
        },
        {
          path:'bitcoinAnalysis',
          component:bitcoinAnalysis
        },
      ] // children 끝
    } // router 설정 끝
  ], // routes 끝

})
