import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

import './styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/utlis/dayjs'
// 使用Vant 组件库
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
