<template>
  <h1 >{{title}}</h1>
</template>
<script>

  export default{
    props:{
      title:{
        type:String,
      }
    },
    data(){
      return {

      }
    }
  }
</script>
<style scoped>
  h1 {
    margin-top: 10px;
    padding-bottom:10px;
    border-bottom: 1px solid #ccc;
  }
</style>
