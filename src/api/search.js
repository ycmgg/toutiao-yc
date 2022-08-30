
import request from "@/utlis/request"

// 搜索联想
export const getSearchSuggestions = q => {
   return request({
        method:'GET',
        url:'/v1_0/suggestion', 
        params:{
            q
        }
    })
} 

// 搜索结果
export const getRecord = params => {
   return request({
        method:'GET',
        url:'/v1_0/search', 
        params
    })
} 