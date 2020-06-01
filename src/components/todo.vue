<template>
  <div>
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeItem" v-on:changeItem="changeItem"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>

</template>

<script>
import TodoFooter from "./todo/TodoFooter"
import TodoHeader from "./todo/TodoHeader"
import TodoInput from "./todo/TodoInput"
import TodoList from "./todo/TodoList"

export default {

  data() {
    return {
      todoItems: []
    }
  },
  created() {
    if(localStorage.length>0){
      for(var i=0; i<localStorage.length; i++){
        this.todoItems.push(localStorage.key(i));
      }
    }
  },
  methods: {
    addTodo(todoItem){
      localStorage.setItem(todoItem, todoItem);
      this.todoItems.push(todoItem)
    },

    clearAll(){
      localStorage.clear();
      this.todoItems = []
    },

    removeItem(todoItem, index){
      localStorage.removeItem(todoItem);
      this.todoItems.splice(index,1)
    },
    changeItem(todoItem, index){
      console.log(todoItem.index)

    }
  },

  components:{
    'TodoFooter':TodoFooter,
    'TodoHeader':TodoHeader,
    'TodoInput':TodoInput,
    'TodoList':TodoList,
  }
}
</script>

<style scoped>
</style>
