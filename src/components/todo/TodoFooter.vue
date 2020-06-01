<template>
  <div>
    <button v-on:click="removeAll()">모두 삭제</button>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  methods: {
    removeAll(){
      this.$emit("removeAll")
    }
  }
}
</script>

<style scoped>
</style>
