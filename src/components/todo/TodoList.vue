<template>
  <div>
    <li v-for="(todoItem, index) in propsdata">
      {{todoItem}}
      <button v-on:click="removeTodo(todoItem, index)">삭제</button>
      <button v-on:click="changeTodo(todoItem, index)">위로</button>
    </li>
  </div>
</template>

<script>
export default {
  props:['propsdata'],
  methods: {
    removeTodo(todoItem, index){
      this.$emit("removeItem", todoItem, index)
    },
    changeTodo(todoItem, index){
      this.$emit("changeItem", todoItem, index)
    }
  }
}
</script>

<style scoped>
</style>
