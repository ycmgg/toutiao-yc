<template>
  <div class="comment-reply">
    <van-nav-bar
     :title="component.reply_count === 0 ? '暂无回复' : `${component.reply_count}条回复`"> 
    </van-nav-bar>

<div class="neirong-reply">
   <CommentTime :valos="component" />
   <van-cell title="全部回复" />

   <CommentList :suoon="component.com_id" type="'c'"  :list="connu"/>
</div>


   <div class="soll-res">
     <van-button class="soll-btn" round @click="show = true">写评论</van-button>
   </div>

   <!-- 发布评论 -->
   <van-popup  v-model="show" position="bottom" >
     <CommentPost :target="component.com_id" @post-sueen="isfommop"/>
   </van-popup>
  </div>
</template>

<script>
import CommentTime from './comment-itme.vue'
import CommentList from './comment-list.vue'
import CommentPost from './comment-post.vue'
export default {
  name:'CommentReply',
  components: {
    CommentTime,
    CommentList,
    CommentPost
  },
  props: {
    component:{
        type:Object,
        required:true
    }
  },
  data () {
    return {
      show:false,
      connu:[]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    isfommop (data) {
       this.component.reply_count++
       this.show = false
       this.connu.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
 .comment-reply{
   .neirong-reply{
      padding-bottom: 88px;
   }
     .soll-res{
       position: fixed;
       left: 0;
       bottom: 0;
       right: 0;
       background-color: #fff;
       height: 88px;
       display: flex;
       align-items: center;
       justify-content: center;
       border-top: 1px solid rgba(0, 0, 0, 0.281);
       .soll-btn{
          width: 60%;
          height: 80%;
       }
     }
 }
</style>