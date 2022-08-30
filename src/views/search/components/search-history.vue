<template>
  <div class="search-history">
     <van-cell title="搜索历史">
      <div v-if="ifshow">
        <span @click="$emit('sancusearchhilths')">全部删除</span>
        &nbsp; 
        <span @click="ifshow = false">完成</span>
      </div>
        <van-icon name="delete-o" v-else @click="ifshow = true"/>
     </van-cell>

     <van-cell :title="val" v-for="(val,ind) in searchhilths" :key="ind" @click="delsearchhilths(val,ind)">
        <van-icon name="close" v-show="ifshow"/>
     </van-cell>
    
  </div>
</template>

<script>
export default {
   name:'SearchHistory',
   data () {
      return {
         ifshow:false,
      }
   },
   props:{
      searchhilths:{
         type:Array,
         required:true
      }
   },
   methods:{
      delsearchhilths(val,index) {
          if(this.ifshow) {
             this.searchhilths.splice(index,1)
          } else {
            this.$emit('search',val)
          }
      }
   }
}
</script>

<style>

</style>