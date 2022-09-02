import request from "@/utlis/request"

export const getcomment = params => {
    return request({
        url:'/v1_0/comments',
        method:'GET',
        params
    })
}

// 点赞
export const addcommentlikings = target => {
    return request({
        url:'/v1_0/comment/likings',
        method:'POST',
        data:{
            target
        }
    })
}

// 取消点赞
export const delcommentlikings = target => {
    return request({
        url:`/v1_0/comment/likings/${target}`,
        method:'DELETE',
    })
}


// 对文章进行评论
export const addcomment = data => {
    return request({
        url:'/v1_0/comments',
        method:'POST',
        data
    })
}


