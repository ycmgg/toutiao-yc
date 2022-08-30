<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 子路由出口 -->

    <!-- 底部栏标签 -->
  <van-tabbar class="layout-tabbar"  route>
    <van-tabbar-item to="/shouye">
      <i slot="icon" class="toutiao toutiao-shouye"></i>
      <span class="text">首页</span>
    </van-tabbar-item>

    <van-tabbar-item to="/wenda">
      <i slot="icon" class="toutiao toutiao-wenda"></i>
      <span class="text">问答</span>
    </van-tabbar-item>

    <van-tabbar-item to="/shipin">
      <i slot="icon" class="toutiao toutiao-shipin"></i>
      <span class="text">视频</span>
    </van-tabbar-item>

    <van-tabbar-item to="/wode">
      <i slot="icon" class="toutiao toutiao-wode"></i>
      <span class="text">{{$store.state.user ? '我的' : '未登录'}}</span>
    </van-tabbar-item>
   
  </van-tabbar>
  <!-- 底部栏标签 -->
  
  </div>
</template>

<script>
export default {
    name:'LayoutIndex'

}
</script>

<style scoped lang="less">
 .layout-container{
   .layout-tabbar{
        i.toutiao{
          font-size: 40px;
        }
        span.text{
          font-size: 20px;
        }
   }
 }
</style>