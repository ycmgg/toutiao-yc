<template>
     <van-icon
      color="#ffa500"
      :name="value ? 'star' : 'star-o' "
      @click="oncollect"
      :loading ="loading"
    />
</template>

<script>
import {addcollect,delcollect} from '@/api/article'
export default {
 name:'CollectArticle',
 data () {
  return {
    loading:false
  }
 },
 props:{
    value:{
      type:Boolean,
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
           if(this.value) {
            // 已收藏 取消收藏
            await delcollect(this.articleId)
           } else {
            //   未收藏  添加收藏
            await addcollect(this.articleId)
           }
          //  更新视图
          this.$emit('input', !this.value)
         this.$toast.success(this.value ? '取消收藏成功' : '添加收藏成功')
        } catch (err) {
          this.$toast('操作失败,请重试') 
        }
       this.loading = false
   }
 }
}
</script>

<style scoped lang="less">


</style>