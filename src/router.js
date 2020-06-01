import Vue from 'vue'
import Router from 'vue-router'
import main from './components/main'
import spanish from './components/spanish'
import weather from './components/weather'
import todo from './components/todo'
import trade from './components/trade'
import bitcoin from './components/bitcoin'
import spanishWord from './components/spanishWord'


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
          path:'spanish',
          component:spanish
        },
        {
          path:'weather',
          component:weather
        },
        {
          path:'todo',
          component:todo
        },
        {
          path:'trade',
          component:trade
        },
        {
          path:'bitcoin',
          component:bitcoin
        },
        {
          path:'spanishWord',
          component:spanishWord
        }
      ]
    }
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})
