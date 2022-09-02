<template>
  <div class="user-profile">
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <input type="file" hidden ref="file" @change="onFileChange">

    <van-cell title="头像"  @click="$refs.file.click()" is-link>
      <van-image
        class="avatar"
        round
        fit="cover"
        :src="user.photo"
       
      />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="showname = true"/>
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女' " is-link @click="showgender = true"/>
    <van-cell title="生日" :value="user.birthday" is-link @click="showbirthday = true"/>
    
    <!-- 编辑昵称 -->
     <van-popup v-model="showname" position="bottom" :style="{ height: '100%' }" > 
         <UpdataName v-if="showname" v-model="user.name" @name="showname = false"/>
     </van-popup>
    <!-- 编辑昵称 -->

    <!-- 编辑性别 -->
     <van-popup v-model="showgender" position="bottom"  > 
         <UpdateGedner v-if="showgender" v-model="user.gender" @name="showgender = false"/>
     </van-popup>
    <!-- 编辑性别 -->

    <!-- 编辑生日 -->
       <van-popup v-model="showbirthday" position="bottom"  > 
         <UpdateBirthday v-if="showbirthday" v-model="user.birthday" @name="showbirthday = false"/>
     </van-popup>
    <!-- 编辑生日 -->

    <!-- 编辑头像 -->
      <van-popup v-model="showphoto" position="bottom" :style="{ height: '100%' }" >
        <UpdatePhoto :img="img" @name="showphoto = false" @photo="user.photo = $event"/> 
     </van-popup>
    <!-- 编辑头像 -->
  </div>
</template>

<script>
import {addUserProfile} from '@/api/user'
import UpdataName from './commnet/updata-name.vue'
import UpdateGedner from './commnet/update-gedner.vue'
import UpdateBirthday from './commnet/update-Birthday.vue'
import UpdatePhoto from './commnet/update-photo.vue'
export default {
 name:'user-profile',
 components: {
  UpdataName,
  UpdateGedner,
  UpdateBirthday,
  UpdatePhoto
 },
  props: {},
  data () {
    return {
        user:{},
        showname:false,
        showgender:false,
        showbirthday:false,
        showphoto:false,
        img:'',
    }
  },
  computed: {},
  watch: {},
  created () {
    this.detUser()
  },
  mounted () {},
  methods: {
    async detUser () {
        try {
           const {data} = await addUserProfile()
           this.user = data.data
        } catch (err) {
            this.$toast.fail('获取用户信息失败')
        }
    },
      onFileChange () {
      const file = this.$refs.file.files[0]

      const data = window.URL.createObjectURL(file)
      this.img = data
      this.showphoto = true
      this.$refs.file.value = ''
  }
  },

}
</script>

<style scoped lang="less">
.user-profile{
    .avatar{
        width: 60px;
        height: 60px;
    }
    /deep/ .van-icon{
        color: #fff;
     }
    /deep/ .van-cell__right-icon{
           color: #969799;
     }
     .van-popup{
        background-color: #f5f7f9;
     } 
}

</style>