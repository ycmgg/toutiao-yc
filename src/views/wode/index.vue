<template>
  <div class="wode-container">  
    <div class="shang xia" v-if="user">
       <div class="shang-shang">
        <div class="left">
            <van-image
            fit="cover"
            class="img"
            round
            :src="userInfo.photo"
           />
           <span class="name">{{userInfo.name}}</span>
        </div>

        <van-button round class="btn" to="/user/profile">编辑资料</van-button>
     
       </div>

       <div class="shang-xia">

         <div class="data-itme">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
         </div>

         <div class="data-itme">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
         </div>

         <div class="data-itme">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
         </div>

         <div class="data-itme">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
         </div>

       </div>
    </div>


   <div class="shang" v-else>
       <div class="top" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="">
        <span>登录 / 注册</span>
       </div>
    </div>     

      <van-grid :column-num="2" class="grid-nav" clickable>
        <van-grid-item class="grid-itme">
            <i slot="icon" class="toutiao toutiao-shoucang"></i>
            <span slot="text" class="text">收藏</span>
        </van-grid-item>

        <van-grid-item class="grid-itme">
            <i slot="icon" class="toutiao toutiao-lishi"></i>
            <span slot="text" class="text">历史</span>
        </van-grid-item>
       </van-grid>

  
       <van-cell-group style="margin-top:6px;">
        <van-cell title="消息通知" is-link /> 
        <van-cell title="小智同学" is-link />
       </van-cell-group>
        <van-cell v-if="user" title="退出登录" class="ycmgg" clickable @click="btn" />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getUserform} from '@/api/user'
export default {
  data () {
    return {
      userInfo:{},
    }
  },
name:'WodeIndex',
created(){
   if(this.user){
   this.loadUserInfo()
   }
 },
 computed:{
  ...mapState(['user']),
 },
 methods:{
  btn(){
    this.$dialog.confirm({
       title: '确认退出吗?',
   })
  .then(() => {
    this.$store.commit('strUser',null)
  })
  .catch(() => {
    console.log('取消退出')
  });
  },
 async loadUserInfo() {
    try{
     const {data} = await getUserform()
     console.log('请求成功')
     this.userInfo = data.data
    } catch (err) {
      this.$toast('获取数据失败')
    }
 }
 }
}
</script>

<style scoped lang="less">
   .wode-container{
    /deep/.van-tabbar--fixed{
      bottom: 20px;
    }
    .shang{
      height: 361px;
      width: 100%;
      background-image: url('~@/assets/banner.png');
      background-size: cover;
    .top{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 361px;
      img{
         width: 132px;
         height: 132px;
            margin-bottom: 15px;
      }
      span{
        font-size: 28px;
        color: #fff;
      }
    }
   }
   .xia{
      .shang-shang{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 231px;
        padding:30px 20px 0 20px;
        box-sizing: border-box;
        .left{
          display: flex;
          align-items: center;
          .img{
            border: 4px solid #fff;
             margin-right: 15px;
             width: 132px !important;
             height:132px !important;
           }
           .name{
              font-size: 30px;
              color: #fff;
           }
        }
        .btn{
          width: 160px;
          height: 60px;
          font-size: 20px;
        }
       
      }
      .shang-xia{
        height: 130px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .data-itme{
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          .count{
            font-size: 45px;
            margin-bottom: 6px;
          }
          .text{
            font-size: 20px;
          }
        }
      }
   }

   .grid-nav{
    .grid-itme{
      i{
        color: rgb(0, 226, 251);
        font-size: 50px;
      }
      span{
        font-size: 20px;
        margin-top: 10px;
      }
    }
   }

   .ycmgg{
     margin-top: 12px;
     color: red;
     text-align: center;
   }
  }
</style>