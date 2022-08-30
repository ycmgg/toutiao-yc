<template>
  <div class="search-suggestions">
    <van-cell icon="search" v-for="(val,ind) in suggestions" :key="ind" @click="$emit('search',val)">
        <div slot="title" v-html="hilhilth(val)"></div>
    </van-cell>
  </div>
</template>

<script>
import {getSearchSuggestions}  from '@/api/search'
import {debounce} from 'lodash'
export default {
    name:'SearchSuggestions',
    data () {
        return {
          suggestions:[],
          htmlStr:'',
        }
    },
    props:{
        searchText:{
            type:String,
            required:true,
        }
    },
    watch:{
       searchText:{
        //   handler(val){
        //      this.getsuggestions(val)
        //   },
          handler: debounce(function(val){
            this.getsuggestions(val)
          },500),
          immediate:true
       } 
    },
    methods: {
      async getsuggestions (q) {

        try {
          const {data} = await getSearchSuggestions(q)
          this.suggestions = data.data.options
        } catch (err) {
         this.$toast('请求失败')
        }
        

      },
      hilhilth(text){        
        return text.replace( new RegExp(this.searchText,'gi'),`<span style="color:#3296fa">${this.searchText}</span>`)
      }  
    }
}
</script>

<style>
</style>