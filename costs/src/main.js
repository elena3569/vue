import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'
import modal from './plugins/ModalWindows'
import menu from './plugins/ContextMenu'

Vue.config.productionTip = false
Vue.use(modal)
Vue.use(menu)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
