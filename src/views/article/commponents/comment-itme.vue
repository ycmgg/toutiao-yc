<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="valos.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{valos.aut_name}}</div>
      <van-button
        @click="onCommentitme"
        :loading="loading"
        class="like-btn"
        :class="{likeon:valos.is_liking}"
        :icon="valos.is_liking ? 'good-job' : 'good-job-o'"
      >{{valos.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{valos.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{valos.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click',valos)"
        >回复 {{valos.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import {addcommentlikings,delcommentlikings} from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    valos:{
        type:Object,
        required:true
    }
  },
  data () {
    return {
      loading:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
   async onCommentitme() {
    this.loading = true
       try {
         if(this.valos.is_liking) {
           await delcommentlikings(this.valos.com_id)
           this.valos.like_count--
         } else {
           await addcommentlikings(this.valos.com_id)
           this.valos.like_count++
         }
         this.valos.is_liking = !this.valos.is_liking
       } catch (err) {
         this.$toast.fail('操作失败,请稍后重试')
       }
   this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .likeon{
    color: #e5645f;
  }
}
</style>
