import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'

// import { stringifyQuery } from 'vue-router/src/util/query'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 避免页面刷新导致的数据丢失
     setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
