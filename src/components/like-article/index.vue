<template>
     <van-icon
      color="#ffa500"
      :name="value === 1 ? 'good-job' : 'good-job-o' "
      :loading ="loading"
      @click="oncollect"
    />
</template>

<script>
import {addLike,delLike} from '@/api/article'
export default {
 name:'LikeArticle',
 data () {
  return {
    loading:false
  }
 },
 props:{
    value:{
      type:Number,
      required:true
    },
    articleId:{
      type:[Number,String,Object],
      required:true
    }
 },
 methods:{
  async oncollect () {
      this.loading = true
       try {
        let shoer = -1
        if(this.value === 1) {
        //   已点赞  取消点赞
          await delLike(this.articleId)
        } else {
       //  未点赞  点一个赞   
          await addLike(this.articleId)
         shoer = 1
        }
        // 更新视图
        this.$emit('input', shoer) 
        this.$toast.success(shoer === 1 ? '点赞成功' : '取消点赞成功')
       } catch (err) {
         this.$toast.fail('点赞失败,请稍后重试')
       } 
      this.loading = false
   }
 }
}
</script>

<style scoped lang="less">


</style>