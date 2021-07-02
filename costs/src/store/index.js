import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categories: []
  },
  getters: {
    paymentsList (state) {
      return state.paymentsList
    },
    categories (state) {
      return state.categories
    }
  },
  mutations: {
    SET_ITEMS (state, data) {
      state.paymentsList = data
    },
    SET_CATEGORIES (state, data) {
      state.categories = data
    }
  },
  actions: {
    getItems ({ commit }) {
      let arr = []
      fetch('https://raw.githubusercontent.com/elena3569/costsRepo/main/costs')
        .then(result => result.json())
        .then(data => {
          for (const key in data) {
            arr = [...arr, ...data[key]]
          }
          commit('SET_ITEMS', arr)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCategories ({ commit }) {
      fetch('https://raw.githubusercontent.com/elena3569/costsRepo/main/categories')
        .then(result => result.json())
        .then(data => {
          commit('SET_CATEGORIES', data.categories)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addCategory ({ state, commit }, data) {
      const buf = [...state.categories]
      buf.push(data)
      commit('SET_CATEGORIES', buf)
    },
    addItem ({ state, commit }, data) {
      const bufItems = [...state.paymentsList]
      const obj = {
        id: bufItems.length + 1,
        date: data.date,
        category: data.category,
        value: data.value
      }
      bufItems.push(obj)
      commit('SET_ITEMS', bufItems)
    },
    updItem ({ commit }, data) {
      commit('SET_ITEMS', data)
    }
  }
})
