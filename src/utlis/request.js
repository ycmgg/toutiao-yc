import axios from "axios"
import store from '@/store'
import JSONbigint from 'json-bigint'

const request = axios.create({
    baseURL:'http://toutiao.itheima.net',
    transformResponse:[function (data) {
        try {
           return JSONbigint.parse(data)
        } catch (err) {
           return data
        }
    }]
})


request.interceptors.request.use( function (config) {
    const {user} = store.state

    if(user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
} , function (error) {
    return Promise.reject(error)
})

export default request