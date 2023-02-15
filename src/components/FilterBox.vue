<template>
  <div @click="fire" :class="필터 + ' filter-item'" :style="`background-image:url(${images})`">
    <slot></slot>

  </div> 
</template>

<script>
export default {
    name : 'filterbox',
    methods :{
      fire(){
        this.emitter.emit('boxclick', this.필터)
      }
    },
    props : {
        images : String,
        필터 : String,
    },
}
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : black;
  background-size: cover;
  background-position : center;
}
</style>