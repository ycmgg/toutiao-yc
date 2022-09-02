<template>
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error="error"
  error-text="加载失败,请重试"
  @load="onLoad"
  :immediate-check="false"
>
  <CommentItem v-for="(item,ind) in list" :key="ind" :valos="item" @reply-click="$emit('reply-click',$event)"/>
</van-list>
</template>

<script>
import {getcomment} from '@/api/comment'
import CommentItem from './comment-itme.vue'
export default {
 name:'CommentList',
  components: {
    CommentItem,
  },
  props: {
    suoon:{
        type:[Number,String,Object],
        required:true
      },
      list:{
        type:Array,
        default: () => []
      },
      type:{
        type:String,
        ValidityState (valus) {
          return ['a','c'].includes(valus)
        },
        default:'a'
      }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      error : false,
      offset: null,
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoad()
    this.loading = true
  },
  mounted () {},
  methods: {
    async onLoad() {

        try {
        // 1. 请求获取数据
        const {data} = await getcomment({
            type : this.type,
            source : this.suoon.toString(),
            offset : this.offset,
            limit : 10
        })
        // 2. 将数据添加到列表中
        let {results} = data.data
        this.list.push(...results)

        this.$emit('pingnen',data.data)
        // 3. 将 loading 设置为 false
        this.loading = false
        // 4. 判断是否还有数据
        if(results.length){
         //  有就更新获取下一页的数据页面
         this.offset = data.data.last_id
        } else {
        // 没有就将 finished 设置结束
         this.finished = true
        }

        } catch (err) {
          this.loading = false
          this.error = true
        }

    },
  }
}
</script>

<style scoped lang="less">

</style>