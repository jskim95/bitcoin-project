<template>
  <div id="ALL">
    <div id="wordTotal">

      <div id="allDayWord">
        <div class="wordButton" v-for="(getWord, index) in getWord" v-on:click="showAll(getWord), active(index)" v-bind:class="{'wordButton': show == true}">
         <span>day{{index+1}}</span>
        </div>
      </div>


      <div v-if="showWord.length>0">
        <input type="radio" checked="checked" name="word" v-on:click="showBasic">전체보기</input>
        <input type="radio" name="word" v-on:click="showKorean">한국어만</input>
        <input type="radio" name="word" v-on:click="showSpanish">스페인어만</input>
        <input type="radio" name="word" v-on:click="showRandom">랜덤</input>
        <input type="radio" name="word" v-on:click="reset">초기화</input>
      </div>


      <div id="content">

      <div class="AllWordTable">
        <div class="dayAddTable" v-for="showWord in showWord">

            <div class="dayWordTable" v-for="showWord in showWord"  v-if="checked===1">
                 <span class="wordContent">{{showWord[0]}}</span>
                 <span class="wordContent">{{showWord[1]}}</span>
            </div>

            <div class="dayWordTable" v-for="showWord in showWord"  v-if="checked===5">
                 <span class="wordContent">{{showWord[0]}}</span>
                 <span class="wordContent">{{showWord[1]}}</span>
            </div>

          <div class="dayWordTable" v-for="showWord in showWord"  v-if="checked===2">
             <span class="wordContent"> </span>
             <span class="wordContent">{{showWord[1]}}</span>
          </div>

          <div class="dayWordTable" v-for="showWord in showWord"  v-if="checked===3">
             <span class="wordContent">{{showWord[0]}}</span>
             <span class="wordContent"> </span>
          </div>

        </div>
      </div>


      <div class="AllWordTable">
        <div class="dayAddTable" v-for="randomWord in randomWord">

          <div class="dayWordTable" v-for="randomWord in randomWord"  v-if="checked===4">
           <span class="wordContent"> {{randomWord[0]}}</span>
           <span class="wordContent"> {{randomWord[1]}}</span>
          </div>

        </div>
      </div>


      </div>

    </div>
  </div>


</template>

<script>

import { createNamespacedHelpers } from 'vuex';
const spanish = createNamespacedHelpers('spanish')

export default {
  data() {
    return {
    }
  },

  computed: {
    ...spanish.mapState([
      'getWord',
      'checked',
      'showWord',
      'randomWord',
      'show',
    ])
  },

  methods: {
    ...spanish.mapActions([
      'getData',
      'showAll',
      'showBasic',
      'showKorean',
      'showSpanish',
      'showRandom',
      'reset',
    ]),

    active(index) {
      var element = document.getElementsByClassName("wordButton");
      element[index].classList.add("unClick");
    },

    test() {
      this.show = true
    },

    ...spanish.mapMutations([
      'SET_WORD',
      'SELECT_WORD',
      'RESET_WORD',
      'SET_RANDOMWORD',
    ]),
  },

  mounted() {
    this.getData()
  }

}
</script>

<style scoped>
  #ALL {
    background: black;
  }
  #wordTotal{
    align-items: center;
    margin-left: 5%;
    width: 90%;
    min-height: 800px;
    background-color: white;
  }

  #allDayWord {
    display: flex;
    flex-direction: row;
  }

  .wordButton {
    cursor: pointer;
    background: #b8b8b8;
    color: #fff;
    width: 4%;
    height: 30px;
    margin: 1%;
    padding-top: 5px;
    text-align: center;
    border-radius: 8px;
  }

  .unClick {
    background: #1dc078;
  }

  #content {
    margin-top: 5%;
  }

  .AllWordTable {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .dayAddTable {
    width: 45%;
    margin: 1%;
  }

  .dayWordTable {
    width: 100%;
    background: azure;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

  }
  .wordContent {
    width: 49%;
    border: 1px solid gray;
    text-align: center;
    height: 40px;
  }

</style>
