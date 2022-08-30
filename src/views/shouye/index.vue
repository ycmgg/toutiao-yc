<template>
  <div class="shouye-container">
    <!-- 导航栏 -->
   <van-nav-bar title="登录" class="page-nav-bar" fixed>
     <van-button 
     slot="title" 
     icon="search" 
     round 
     class="btnss"
     size="small"
     type="info"
     to="/search"
     >搜索</van-button>
   </van-nav-bar>
   <!-- 导航栏 -->

   <!-- 频道列表 -->
   <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="val.name" v-for="val in channels" :key="val.id">
        <articleIist :channels="val"/>
      </van-tab>
      <div slot="nav-right" class="ploknhgd"></div>
      <div slot="nav-right" class="hamburger-btn" @click="show = true">
        <van-icon name="bars" />
      </div>
   </van-tabs>
   <!-- 频道列表 -->
      
   <!-- 频道编辑弹出层 -->
   <van-popup
     round
     v-model="show"
     closeable
     position="bottom"
     close-icon-position="top-left"
     :style="{ height: '100%' }"
    >
    <ChannelEdit :mychannels="channels" :active="active" @upon-qiehan="qiehuan"/>
    </van-popup>
   <!-- 频道编辑弹出层 -->
  </div>
</template>

<script>
import articleIist from '@/views/layout/commponents/article-list.vue'
import {getUserChannels} from '@/api/user'
import ChannelEdit from '@/components/channel-edit/channel-edit.vue'
import {mapState} from 'vuex'
import {getItem} from '@/utlis/storage'
export default {
  computed: {
    ...mapState(['user'])
  },
  components: {
    articleIist,
    ChannelEdit
  },
  created () {
    
    this.loadChannels()
  },
  methods:{
    async loadChannels() {
       try {
         let channel = []
         if(this.user){
        //  已登录请求用户频道数据
            const {data} = await getUserChannels()
            channel = data.data.channels
         } else {
        //  未登录 在本地存储里面拿数据
          const getbdcc = getItem('TOUYIAO_CHANNELS')
        //   判断本地存储里面有数据没
          if(getbdcc) {
            //   本地存储有数据
            channel = getbdcc
          } else {
            //   本地存储没有数据 请求获取推荐频道数据
            const {data} = await getUserChannels()
            channel = data.data.channels
          }

         }
       
        // const {data} = await getUserChannels()
        //  this.channels = data.data.channels

        this.channels = channel
       } catch (err) {
          this.$toast('获取频道列表失败')
       }
     },
     qiehuan(index,show){
        this.active = index
        this.show = show
     }
  },
 name:'ShouyeIndex',
 data () {
  return {
    active:0,
    channels:[],
    show:false,
  }
 }
}
</script>

<style scoped lang="less">
   .shouye-container{
    padding-top: 174px;
    padding-bottom: 100px;
      .page-nav-bar{
         .btnss{
            width: 400px;
            height: 64px;
            background-color: #5babfb;
            border: none;
            font-size: 20px;
            .van-icon {
              font-size: 32px;
            }
         }
      }
      
    /deep/ .channel-tabs{
          .van-tabs__wrap{
            position: fixed;
            top: 92px;
            z-index: 1;
            left: 0;
            right: 0;
            height: 82px;
          }
          .van-tab{
            min-width: 200px;
            border-right: 1px solid #edeff3;
            font-size: 30px;
            color: #777;
          }
          .van-tab--active {
            color: #333;
          }
          .van-tabs__nav {
            padding-bottom: 0 ;
          }
          .van-tabs__line{
            bottom: 8px;
            widows: 31px !important;
            height: 6px;
            background-color: #3296fa;
          }
          .ploknhgd{
            width: 66px;
            height: 82px;
            flex-shrink: 0;
          }
          .hamburger-btn{
             position: fixed;
             right: 0;
             display: flex;
             justify-content: center;
             align-items: center;
             width: 66px;
             height: 82px;
             background-color: rgba(255, 255, 255, 0.767);
             .van-icon-bars{
              font-size: 50px;
             }
             &::before{
              content: "";
              position: absolute;
              left: 0;
              width: 1px;
              height: 100%;
              background-image: url(~@/assets/gradient-gray-line.png);
              background-size: contain;
             }
          }
      }
   }
</style>