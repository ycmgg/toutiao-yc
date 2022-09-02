<template>
  <div class="update-photo">
    <img :src="img" alt="" class="img" ref="img">

    <div class="text">
         <div class="clo" @click="$emit('name')">取消</div>
         <div class="qan" @click="ifoshow">确认</div>
    </div>
  </div>
  
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import {Updataimg} from '@/api/user'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    img:{
        type:[String,Object],
        required:true
    }
  },
  data () {
    return {
        cropper:null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
const image = this.$refs.img
 this.cropper = new Cropper(image, {
    viewMode:1,
    dragMode:'move',
    aspectRatio:1,
    autoCropArea:1,
    cropBoxMovable:false,
    cropBoxResizable:false,
    background:false,
})
  },
  methods: {
    ifoshow () {
       this.cropper.getCroppedCanvas().toBlob(async blob => {
           try {
            this.$toast.loading({
            message: '保存中...',
            forbidClick:true,
            duration:0
            })

            const formData = new FormData()
            formData.append('photo',blob)
            const {data} = await Updataimg(formData)
            this.$emit('name')
            this.$emit('photo',data.data.photo)
            this.$toast.success('更新成功')
           } catch (err) {
             this.$toast.fail('修改失败')
           }
       })
    }
  }
}
</script>

<style scoped lang="less">
.update-photo{
    background-color: #000;
    height: 100%;
.img{
    display: block;
    max-width: 100%;
 }
 .text{
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .clo,.qan{
        width: 90px;
        height: 90px;
        font-size: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
 }
}

</style>