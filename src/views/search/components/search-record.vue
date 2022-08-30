<template>
  <div class="search-record">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="加载失败, 请点击重试"
  @load="onLoad"
>
  <van-cell v-for="(item,ind) in list" :key="ind" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import {getRecord} from '@/api/search'
export default {
  name:'SearchRecord',
  props: {
   searchText:{
    type:String,
    required:true
   }
  },
   data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error:false,
      page:1,
      per_page:20
    };
  },
  methods: {
   async onLoad() {
        try {
    //  1.请求获取数据
         const {data} = await getRecord({
            page:this.page,
            per_page: this.per_page,
            q:this.searchText
         })
      
    //  2.将数据添加到数组列表中
        let res = data.data.results
       this.list.push(...res) 
       console.log(this.list)
    //  3. 将本次加载中的 loading 关闭
        this.loading = false
    //  4. 判断是否还有数据
     if(res.length){
       //    如果有, 则更新获取下一个数据的页码
       this.page++
     } else {
          //    如果没有,则将加载状态 finished 设置为结束
          this.finished = true
     }

        } catch (err) {
           this.error = true
           this.loading = false
        }

    },
  },
}
</script>

<style>

</style>