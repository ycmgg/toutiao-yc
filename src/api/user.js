import request from "@/utlis/request"

export const login = data => {
   return request({
        method:'POST',
        url:'/v1_0/authorizations', 
        data
    })
} 

export const sendSms = mobile => {
   return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`, 
    })
} 


export const getUserform = () => {
   return request({
        method:'GET',
        url:'/v1_0/user'
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
} 

export const getUserChannels = () => {
   return request({
        method:'GET',
        url:'/v1_0/user/channels'
    })
} 

// 关注用户
export const addfollow = target => {
   return request({
        method:'POST',
        url:'/v1_0/user/followings',
        data:{
            target
        }
    })
} 

// 取消关注用户
export const delfollow = target => {
   return request({
        method:'DELETE',
        url:`/v1_0/user/followings/${target}`,
    })
} 

// 个人信息
export const addUserProfile = () => {
   return request({
        method:'GET',
        url:'/v1_0/user/profile',
    })
} 


// 修改个人信息
export const UpdataDser = data => {
   return request({
        method:'PATCH',
        url:'/v1_0/user/profile',
        data
    })
} 
// 修改个人头像
export const Updataimg = data => {
   return request({
        method:'PATCH',
        url:'/v1_0/user/photo',
        data
    })
} 