import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MyCosts',
      component: () => import('../views/dashboard.vue')
    },
    {
      path: '/add/payment/:category',
      name: 'NewCost',
      component: () => import('../views/dashboard.vue')
    },
    {
      path: '/edit/payment/:id',
      name: 'EditCost',
      component: () => import('../views/dashboard.vue')
    }
  ]
})
