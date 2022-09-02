<template>
  <div class="updata-name">
    <van-nav-bar
       title="设置昵称"
       left-text="取消"
       right-text="完成"
       @click-left="$emit('name')"
       @click-right="Upuser"
   />
  <div class="ycmgg">
    <van-field
     v-model.trim="message"
     rows="2"
     autosize
     type="textarea"
     maxlength="10"
     placeholder="请输入昵称"
     show-word-limit
    />
  </div>

  </div>
</template>

<script>
import {UpdataDser} from '@/api/user'
export default {
  name:'UpdataName',
  components: {},
  props: {
    value :{
        type:String,
        required:true
    }
  },
  data () {
    return {
        message:this.value,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async Upuser () {
        this.$toast.loading({
            message: '保存中...',
            forbidClick:true,
            duration:0
        })
        try {
           if(!this.message.length) {
              this.$toast.fail('内容不能为空')
              return
           }
           await UpdataDser({
              name:this.message
           })
           this.$emit('input',this.message)
           this.$emit('name')
           this.$toast.success('更新成功')
        } catch (err) {
            this.$toast.fail('保存失败请重试')
        }
    }
  }
}
</script>

<style>
.ycmgg{
    margin: 20px;
}
</style>