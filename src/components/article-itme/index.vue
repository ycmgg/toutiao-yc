<template>
  <van-cell class="article-itme" :to="`/article/${article.art_id}`">
    <div slot="title" class="title van-multi-ellipsis--2">{{article.title}}</div>
    <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
         <div class="cover-itme"   v-for="(val,ind) in article.cover.images"
             :key="ind">
            <van-image
             fit="cover"
             :src="val"
             class="cover-itme-img"
            />
       </div>
    </div>
    <div class="label-info-wrap">
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}</span>
      <span>{{ article.pubdate | relativeTime}}</span>
    </div>
    </div>
    <van-image
     class="right-cover"
     v-if="article.cover.type === 1"
     slot="default"
     fit="cover"
     :src="article.cover.images[0]"
     />

  </van-cell>
</template>

<script>
export default {
name:'ArticleItme',
  props:{
    article:{
        type:Object,
        required:true
    }
  }
}
</script>

<style scoped lang="less">
 .article-itme{
     .title{
      font-size: 32px;
      color: #3a3a3a;
     }
     .van-cell__value{
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
     }
     .right-cover{
      width: 232px;
      height: 146px;
     }
     .label-info-wrap span{
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
     }
     .cover-wrap{
      display: flex;
      padding: 30px 0;
       .cover-itme{
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-itme-img{
          width: 100%;
          height: 146px;
        }
       }

     }
 }
</style>