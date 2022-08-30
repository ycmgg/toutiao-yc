import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utlis/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'YOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user:getItem(TOKEN_KEY)
  },
  getters: {
   
  },
  mutations: {
    strUser(state,data){
      state.user = data
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
