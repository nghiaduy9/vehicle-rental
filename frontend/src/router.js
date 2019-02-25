import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/index.vue'
import Login from './views/login.vue'
import Dashboard from './views/dashboard.vue'
import NewVehicle from './views/new-vehicle.vue'
import NewRental from './views/new-rental.vue'
import Payment from './views/payment.vue'

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
    },
    {
      path: '/new-vehicle',
      name: 'new-vehicle',
      component: NewVehicle
    },
    {
      path: '/new-rental',
      name: 'new-rental',
      component: NewRental
    },
    {
      path: '/payment',
      name: 'payment',
      component: Payment
    }
  ]
})
