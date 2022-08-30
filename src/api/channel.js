import request from "@/utlis/request"


// 获取所有频道
export const GetAllchannel = () => {
   return request({
      url:'/v1_0/channels',
      method:'GET'
    })
}
// 推荐用户频道
export const assUserChannel = channel => {
   return request({
      url:'/v1_0/user/channels',
      method:'PATCH',
      data:{
         channels:[channel]
      }
    })
}

// 删除用户频道
export const DelUserChannel = delchannel => {
   return request({
      url:`/v1_0/user/channels/${delchannel}`,
      method:'DELETE',
    })
}