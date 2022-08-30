<template>
  <div class="search-cung">
    <!-- 搜索组件 -->
    <form action="/" class="ycmgg">
       <van-search
         v-model="searchText"
         show-action
         placeholder="请输入搜索关键词"
         @search="onSearch"
         @cancel="onCancel"
         background="#3296fa"
         @focus="ifshow = false"
       />
    </form>
   <!-- 搜索组件 -->

    <!-- 搜索结果 -->
   <SearchRecord v-if="ifshow" :searchText="searchText"/>
   <!-- 搜索结果 -->

    <!-- 联想建议 -->
   <SearchSuggestions v-else-if="searchText" :searchText="searchText" @search="onSearch"/>
   <!-- 联想建议 -->

   <!-- 搜索历史记录 -->
   <SearchHistory v-else :searchhilths="searchhilths" @sancusearchhilths="searchhilths = []" @search="onSearch"/>
   <!-- 搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history.vue'
import SearchSuggestions from '@/views/search/components/search-suggestions.vue'
import SearchRecord from '@/views/search/components/search-record.vue'
import {setItem,getItem} from '@/utlis/storage'
export default {
 name:'SearchIndex',
 components: {
  SearchHistory,
  SearchSuggestions,
  SearchRecord
 },
 watch:{
   searchhilths (val) {
      setItem('TOUTIAO_REARCH_HISTORY',val)
   }
 },
   data() {
    return {
      searchText: '',
      ifshow:false,
      searchhilths:getItem('TOUTIAO_REARCH_HISTORY') || []
    };
  },
  methods: {
    onSearch(val) {
      this.ifshow = true

      let index = this.searchhilths.indexOf(val)

      if(index !== -1) {
        this.searchhilths.splice(index,1)
      }

      this.searchhilths.unshift(val)


      this.searchText = val
    },
    onCancel() {
      this.$router.back()
    },
  },
}
</script>

<style scoped lang="less">
.search-cung{
  padding-top:108px;
  .van-search__action{
    color: #fff;
  }
  .ycmgg{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }
}

</style>