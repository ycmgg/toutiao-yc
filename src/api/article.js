import request from "@/utlis/request"



export const getArticles = params => {
   return request({
      method:'GET',
      url:'/v1_0/articles',
      params
    })
}

// 文章详情
export const getArticlesXiangqing = articlesId => {
   return request({
      method:'GET',
      url:`/v1_0/articles/${articlesId}`,
    })
}



// 收藏
export const addcollect = target => {
   return request({
      method:'POST',
      url:'/v1_0/article/collections',
      data:{
         target
      }
    })
}
// 取消收藏
export const delcollect = target => {
   return request({
      method:'DELETE',
      url:`/v1_0/article/collections/${target}`,
    })
}

// 点赞
export const addLike = target => {
   return request({
      method:'POST',
      url:'/v1_0/article/likings',
      data:{
         target
      }
    })
}
// 取消点赞
export const delLike = target => {
   return request({
      method:'DELETE',
      url:`/v1_0/article/likings/${target}`,
    })
}