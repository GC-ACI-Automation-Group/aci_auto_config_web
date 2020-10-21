import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    step: 0,
    tenant: '',
    vrf: '',
    bridge_domains: '',
    ap: '',
    epgs: '',
    filters: '',
    contracts: ''
  },
  mutations: {
    changeStep (state, payload) {
      switch (payload) {
        case 'add':
          state.step = state.step + 1
          break
        case 'minis':
          state.step = state.step - 1
          break
      }
    },
    changeData (state, payload) {
      state[payload.key] = payload.data
    }
  },
  actions: {
  },
  modules: {
  }
})
