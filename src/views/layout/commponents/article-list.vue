<template>
  <div class="article-list">

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
     <van-list
         v-model="loading"
         :finished="finished"
         finished-text="没有更多了"
         @load="onLoad"
         :error.sync="error"
         error-text="请求失败，点击重新加载" 
         >

         <article-itme v-for="(article,ind) in list" :key="ind" :article="article" />


     </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import ArticleItme from '@/components/article-itme/index.vue'
import {getArticles} from '@/api/article'
import { Toast } from 'vant'

export default {
  name:'ArticleList',
    components: {
       ArticleItme,
    },
 props:{
    channels:{
        type:Object,
         required:true
    }
 },
 data () {
    return {
      list: [],
      loading: false,
      finished: false,
      Timedata: null,
      error:false,
      isLoading:false,
    }
 },
 methods: {
   async onLoad() {
     try{
      // 1. 请求获取数据
      const {data} = await getArticles({
        channel_id: this.channels.id,
        timestamp: this.Timedata || Date.now(),
        // with_top:1
      })
     const results = data.data.results
     //  2. 把请求结果数据放到 list 的数组中
     this.list.push(...results)
     //  3. 本次数据加载结束之后要把加载状态设置为结束
     this.loading = false
     //  4. 判断数据是否全部加载完成
     if(results.length) {
       this.Timedata = data.data.pre_timestamp
     } else {
        this.finished = true
     }
     } catch (err) {
        this.error = true
        this.loading = false
     }
    
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    },

    async onRefresh() {
        try {
          
         // 1. 请求获取数据
          const {data} = await getArticles({
          channel_id: this.channels.id,
          timestamp: Date.now(),
        // with_top:1
          })
          const results = data.data.results
    
        //  3. 关闭下拉刷新的 loading 状态
        setTimeout(() => {
                //  2. 将数据追加到列表的顶部
               this.list.unshift(...results)
               Toast('刷新成功');
               this.isLoading = false;
              }, 1000);

        } catch (err) {
            this.$toast('刷新失败')
        }
    }
  },
}
</script>

<style>
.article-list{
    height: 82vh;
    overflow-y: auto;
}
</style>