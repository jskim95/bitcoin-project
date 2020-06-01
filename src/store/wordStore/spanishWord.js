import jsonWord from '../../json/word.json'

//vue의 data와 비슷
const state = {
  getWord: [],
  checked: '',
  showWord: [],
  randomWord: [],
  randomNumber: '',
  show:'',

}
// vue의 computed와 비슷
const getters = {

}
// state를 수정할 때 사용
const mutations = {
  SET_WORD(state, data) {
    if(state.getWord.length < Object.keys(jsonWord).length) {
      state.getWord.push(data)
    }
  },
  SELECT_WORD(state, data) {
    state.showWord.push(data)
    if(state.checked == 0 || state.checked == 4) {
      state.checked = 1
    }
    // state.checked = 1
  },
  SET_RANDOMWORD(state, data) {
    if(state.randomWord !== []) {
      state.randomWord = []
    }
    state.randomWord.push([data])
  },

}
// 비동기를 사용할 때, 또는 여러 mutations를 연달아 송출할 때
const actions = {

  getData({state, commit}) {
    if(state.getWord !== []) {
      state.showWord = []
      state.getWord = []
      state.randomWord = []
    }
    for(var i=1; i<=Object.keys(jsonWord).length; i++) {
      commit('SET_WORD', jsonWord["day"+i])
    }
  }, // GET_ALLDATA 함수 끝

  showAll({state, commit}, data) {
    // showWord 안에 값이 클릭햇을때 값이랑 같으면 중복 콘솔찍기
    // 다르면 showWord에 push하기
    state.show = false
    if(state.showWord.length === 0) {
      commit('SELECT_WORD', data)
    }
    for(var i=0; i<state.showWord.length; i++) {
      for(var j=0; j<state.showWord.length; j++) {
        if(data[0] === state.showWord[j][0]) {
          return 0
        }
      }
      return commit('SELECT_WORD', data)
    }

  },

  showBasic({state, commit}) {
    state.checked = 5
  },

  showKorean({state, commit}) {
    state.checked = 2
  },

  showSpanish({state, commit}) {
    state.checked = 3
  },

  showRandom({state, commit}) {
    if(state.randomWord !== []) {
      state.randomWord = []
    }
    state.randomWord = JSON.parse(JSON.stringify(state.showWord))
    for(var i=0; i<state.randomWord.length; i++){

      for(var j=0; j<state.randomWord[i].length; j++) {
        state.randomNumber = parseInt(Math.random()*10%2)
        if(state.randomNumber === 0) {
          state.randomWord[i][j][0] = ' '
        } else {
          state.randomWord[i][j][1] = ' '
        }
      }

    }
    state.randomWord.sort()
    state.checked = 4

  }, // showRandom 함수 끝

  reset({state, commit}) {
    if(state.showWord !== []) {
      state.showWord = []
    }
    if(state.randomWord !== []) {
      state.randomWord = []
    }
    state.show = true
    console.log("시행")
  }


}
export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters,

};
