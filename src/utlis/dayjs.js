import dayjs from "dayjs"
import Vue from 'vue'

import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

Vue.filter('relativeTime', valus => {
    return dayjs().to(dayjs(valus))
})


