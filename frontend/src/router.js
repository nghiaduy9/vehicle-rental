import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/index.vue'
import Login from './views/login.vue'
import Dashboard from './views/dashboard.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})
