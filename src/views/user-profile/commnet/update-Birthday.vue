<template>
  <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('name')"
  @confirm="onConfirm"
 />
</template>

<script>
import {UpdataDser} from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value :{
        type:String,
        required:true,
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value),
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
            const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
           await UpdataDser({
              birthday:currentDate
           })
           this.$emit('input',currentDate)
           this.$emit('name')
           this.$toast.success('更新成功')
        } catch (err) {
            this.$toast.fail('保存失败请重试')
        }
    },
  }
}
</script>

<style>

</style>