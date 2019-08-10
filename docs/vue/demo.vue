<template>
  <div id="example" @click="handleClick">
    <div class="real-click">real click on me</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    
    methods:{
      handleClick(event){
        console.log(event.target)
        console.log(event.target,event.currentTarget)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
