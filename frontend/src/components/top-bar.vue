<template>
  <nav class="navbar navbar-expand sticky-top navbar-light bg-light shadow">
    <router-link class="navbar-brand h1 mb-0" to="/">VRS</router-link>
    <div class="collapse navbar-collapse d-flex justify-content-between" v-if="id">
      <div class="navbar-nav">
        <a class="nav-link nav-item active">
          ID:
          <strong>{{ id }}</strong>
        </a>
        <a class="nav-link nav-item active">
          Account type:
          <strong>{{ accType }}</strong>
        </a>
      </div>
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
            Hi
            <strong>{{ fullname }}</strong>
            &nbsp;
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item text-danger" href="#" @click="signOut">Sign out</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import vuecookies from 'vue-cookies'
import router from '../router.js'

export default {
  name: 'TopBar',
  data: function() {
    return { id: '', fullname: '', accType: '' }
  },
  methods: {
    signOut: function() {
      vuecookies.remove('id')
      vuecookies.remove('fullname')
      vuecookies.remove('account-type')
      router.push('/login')
    }
  },
  mounted: function() {
    this.id = vuecookies.get('id')
    this.fullname = vuecookies.get('fullname')
    this.accType = vuecookies.get('account-type')
  }
}
</script>
