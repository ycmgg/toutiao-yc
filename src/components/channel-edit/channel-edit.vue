<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false" class="title-txet ">
      <van-button plain round size="mini" color="#7232dd" class="title-btn" @click="isEnu = !isEnu">&nbsp;{{isEnu ? '完成' : '编辑'}}&nbsp;</van-button>
    </van-cell>
    <van-grid :gutter="10" clickable class="ycmgg">

      <van-grid-item 
      v-for="(channel,ind) in mychannels" 
      :key="channel.id" 
      @click="upclick(channel,ind)"
      >
      <van-icon slot="icon" name="clear" v-show="isEnu && !ifycmmg.includes(channel.id)"></van-icon>
        <span slot="text" :class="{active:active === ind}">{{channel.name}}</span>
      </van-grid-item>

    </van-grid>

 
    <van-cell title="频道推荐" :border="false" class="title-txet">
    </van-cell>
    <van-grid :gutter="10" clickable class="recommend-grid">
      <van-grid-item v-for="value in recommendChannels" :key="value.id"  :text="value.name" icon="add-o" class="grid-item" @click="allbtn(value)"/>
    </van-grid>





  </div>
</template>

<script>

import {GetAllchannel,assUserChannel,DelUserChannel} from '@/api/channel'
import {mapState} from 'vuex'
import {setItem} from '@/utlis/storage'
export default {
  computed :{
    ...mapState(['user']),
    recommendChannels () {
      return this.Allchannel.filter(channels => {
         return !this.mychannels.find(channeln => channeln.id === channels.id )
      })
    }
    // recommendChannels () {
    //   let channel = []
      
    //   this.Allchannel.forEach(channels => {
          
    //       const ret = this.mychannels.find(channeln => {
    //           return channeln.id === channels.id
    //       })
           
    //        if(!ret){
    //         channel.push(channels)
    //        }
    //   })
    //   return channel
    // }
  },
  data () {
    return {
      Allchannel : [],
      isEnu : false,
      ifycmmg:[0]
    }
  },
  methods: {
    async logchaunnout(){
       try {
        const {data} = await GetAllchannel()
        this.Allchannel = data.data.channels
       } catch (err) {
        console.log('获取所有频道失败')
       }
    },
   async allbtn(val) {
     this.mychannels.push(val)
      if(this.user){
        try {
        await assUserChannel({
          id:val.id,
          seq:this.mychannels.length
        })
        } catch (err) {
          
          this.$toast('添加失败,请稍后重试')
        }
    
      } else {
        setItem('TOUYIAO_CHANNELS',this.mychannels)
      }
    },
    upclick(channel,index){
      if(this.isEnu){
         if(this.ifycmmg.includes(channel.id)){
           return
         }

       this.mychannels.splice(index,1)
        if(index <= this.active){
            this.$emit('upon-qiehan',this.active - 1,true)
        }
       
      } else {
       this.$emit('upon-qiehan',index,false)
      }

      this.Delchannel(channel.id)
      
    },

    async Delchannel (id) {
       if(this.user){
         await DelUserChannel(id)
       } else {
         setItem('TOUYIAO_CHANNELS',this.mychannels)
       }
    }
  },
  name :'ChannelEdit',
  props:{
    mychannels:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required:true
    }
  },
  created () {
      this.logchaunnout()
  },

}
</script>

<style  scoped lang="less">
  .channel-edit{
    padding: 100px 0;
    .title-txet{
         font-size: 32px;
         .title-btn{
          width: 104px;
          height: 48px;
          font-size: 26px;
         }
    }
 /deep/ .van-grid-item__content {
    flex-direction: row;
    white-space: nowrap;
    background-color: #dcdee0 ;
    border-radius: 8%;
    .van-grid-item__icon-wrapper{
      position: unset;
    }
     .van-grid-item__icon{
        font-size: 35px;
        margin-right: 5px;
        
     }
    .van-grid-item__text{
       color: #222;
       font-size: 30px;
       margin-top: 0;
    }
  }
  .ycmgg{

  /deep/ .van-icon-clear{
    position: absolute;
    right: -8px;
    top: -8px;
    z-index: 2;
   }
   .active{
    color: red;
   }
  }

 
  }
</style>