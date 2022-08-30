<template>
<div class="login-container">
  <!-- 导航栏 -->
  <van-nav-bar title="登录" class="page-nav-bar">
     <van-icon name="arrow-left" slot="left" @click="$router.back()" class="ycmgg"/>
  </van-nav-bar>
  <!-- 导航栏 -->

  <!-- 登录表单 -->
<van-form @submit="onSubmit" ref="loginForm">

  <van-field 
  name="mobile" 
  placeholder="请输入手机号" 
  v-model="user.mobile"
  :rules="userFormRules.mobile"
  type="number"
  maxlength="11"
  >
    <i slot="left-icon" class="toutiao toutiao-shouji"></i>
  </van-field>

  <van-field
    name="code" 
    placeholder="请输入验证码" 
    v-model="user.code"
    :rules="userFormRules.code"
    type="number"
    maxlength="6"
    >
    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
    <template #button>
    <van-count-down :time="1000 * 60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false"/>
    <van-button v-else size="small" type="default" round class="send-sms-btn" native-type="button" @click="onSendSms" >发送验证码</van-button>
    </template>
  </van-field>

  <div class="login-btn-wrap">
    <van-button  block type="info" native-type="submit" class="login-btn">登录</van-button>
  </div>
</van-form>
  <!-- 登录表单 -->

  </div>
</template>

<script>
import {login,sendSms} from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user:{
        code:'',
        mobile:''
      },
      userFormRules:{
        mobile:[{ required: true, message: '手机号不能为空',},{pattern :/^1[3|5|7|8]\d{9}$/,message:'手机号格式错误'}],
        code:[{ required: true, message: '验证码不能为空' },{pattern:/^\d{6}$/,message:'验证码格式错误'}],
      } ,
      isCountDownShow:false,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
        //  1. 获取表单数据
        const user = this.user
        //  2. 表单验证
       this.$toast.loading({
            message: '登录中...',
            forbidClick: true,
            duration:0
         });
        //  3. 推荐表单请求登录
         try{
            this.$router.push('/shouye')
            const {data} = await login(user)
            this.$store.commit('strUser',data.data)
            this.$toast.success('登录成功')
         } catch (err) {
            if(err.response.status === 400){
                this.$toast.fail('手机号或验证码错误')
            } else {
                this.$toast.fail('登录失败,请稍后重试,也不一定能行')
            }  
         }
        //  4. 根据请求响应结果处理后续操作 
    },
    async onSendSms () {
      // 1. 校验手机号
      try{
       await this.$refs.loginForm.validate('mobile')
        console.log('验证通过');
      } catch (err) {
       return console.log('验证失败',err)
      }
      
      // 2. 验证通过, 显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try{
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        if(err.response.status === 429){
             this.$toast.fail('不要重复发送')
        } else {
            this.$toast.fail('登录失败,请稍后重试,也不一定能行')
        }  
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  .toutiao{
    font-size: 37px;
  }
  .send-sms-btn{
    background-color: #ededed;
    width: 160px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color:#666;
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
        background-color: #6db4fb;
        border: none;
    }
  }
  .ycmgg{
    font-size: 40px;
    color: #fff;
  }
}

</style>