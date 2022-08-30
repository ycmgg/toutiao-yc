<template>
  <van-button
   v-if="isfollowed"
   class="follow-btn"
   round
   size="small"
   @click="onfollow"
   :loading="onfollowlog"
 >已关注</van-button>
 <van-button
 v-else
   class="follow-btn"
   type="info"
   color="#3296fa"
   round
   size="small"
   icon="plus"
   @click="onfollow"
   :loading="onfollowlog"
 >关注</van-button>
</template>

<script>
import {delfollow,addfollow} from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  model:{
  prop:'isfollowed',
  event:'follow-user'
  },
  props: {
    isfollowed:{
        type:Boolean,
        required:true
    },
    id:{
        type:[Number,String,Object],
        required:true
    }
  },
  data () {
    return {
        onfollowlog:false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
        async onfollow() {
      this.onfollowlog = true
       try {
         if(this.isfollowed){
        //  已关注
          await delfollow(this.id)
         } else {
       //  没有关注
          await addfollow(this.id)
         }
        this.$emit('follow-user',!this.isfollowed)  
       } catch (err) {
        let ycmgg = '操作失败,请重试'
        if(err.response && err.response.status === 400) {
           ycmgg = '你不能关注你自己'
        }
         this.$toast(ycmgg)
       }
      this.onfollowlog = false
    }
  }
}
</script>

<style>

</style>