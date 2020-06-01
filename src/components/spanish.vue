<template>
  <div>
    <br />
    <form v-on:submit="test">
      <div v-if="hide">
        {{word[numberTest][1]}}
      </div>
      <br />
      <input type="text" v-model="value" />
      <button type="submit">입력</button>
    </form>

    <div v-if="stop">
      맞은 개수 : {{yes}} <br />
      틀린 개수 : {{no}} <br />
    </div>

    <tr v-for="(stupid, index) in stupid" v-if="stop">

      오답 : {{stupid}}
    </tr>


    <button class="success" v-on:click="show" v-if="stop"> 정답 보기</button>
    <tr v-for="(fail, index) in check" v-if="master">
      정답 : {{index+1}} : {{fail[0]}} : {{fail[1]}}
    </tr>


  </div>
</template>

<script>
import word from '../json/word.json'

export default {
  data(){
    return {
      word: word.day1, // 단어 읽어오기
      value: '', // 입력한 단어
      numberTest: 0, // 몇번째 단어인지 체크
      yes:0, // 맞은개수
      no:0, // 틀린 개수
      stop: false, // 단어 시험끝나고 오답지 정답지 보이게 하기
      hide: true, // 단어 시험끝나면 제시어 숨기기
      check: [], // 틀린것 정답지
      stupid: [], // 어떻게 틀렷는지 보여주기
      master: false // 정답 버튼 눌렀을때 보여주기 위한
    }
  },
  methods:{
    test(e){
      e.preventDefault();

      if(this.word[this.numberTest][0] === this.value){
        this.numberTest++;
        this.yes++;
        if(this.numberTest === 10){
          this.finished()
        }

      } else {
        this.check.push(this.word[this.numberTest])
        this.stupid.push(this.value)
        this.numberTest++;
        this.no++
        if(this.numberTest === 10){
          this.finished()
        }
      }
    },
    finished(){
      this.stop = true;
      this.numberTest = 0;
      this.hide = false;
    },
    show(e){
      e.preventDefault();
      this.master = true;
    },

  },
}
</script>

<style scoped>
  .success {
    background-color: yellow
  }
</style>
