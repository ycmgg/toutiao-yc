<template>
   <div>
    <van-picker
     title="标题"
     show-toolbar
     :columns="columns"
     @confirm="onConfirm"
     @cancel="$emit('name')"
     @change="onChange"
     :default-index="value"
   />
   </div>
</template>

<script>
import {UpdataDser} from '@/api/user'
export default {
    name:'UpdateGedner',
components: {},
  props: {
    value :{
        type:Number,
        required:true,
        default:0
    }
  },
  data () {
    return {
        columns:['男','女'],
        gedner:0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
      async onConfirm () {
        this.$toast.loading({
            message: '保存中...',
            forbidClick:true,
            duration:0
        })
        try {
           await UpdataDser({
              gender:this.gedner
           })
           this.$emit('input',this.gedner)
           this.$emit('name')
           this.$toast.success('更新成功')
        } catch (err) {
            this.$toast.fail('保存失败请重试')
        }
    },
    onChange (a,d,value) {
       this.gedner = value
    }
  }
}
</script>

<style>

</style>