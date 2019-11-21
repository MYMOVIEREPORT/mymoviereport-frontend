const state = {
  token: sessionStorage.getItem('jwt-token') || null
}

const mutations = {
  setToken(state, token) {
    state.token = token
  }
}

const actions = {
  login(options, token) {
    options.commit('setToken', token)
  },
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}