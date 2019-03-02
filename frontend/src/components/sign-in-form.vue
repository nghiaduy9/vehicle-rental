<template>
  <form @submit.prevent="signin">
    <div class="form-group">
      <select class="form-control" v-model="accountType" required>
        <option value selected>Account type...</option>
        <option value="renter">Renter</option>
        <option value="lender">Lender</option>
      </select>
    </div>
    <div class="form-group">
      <input
        class="form-control"
        placeholder="Identity card number"
        type="number"
        v-model="identityNumber"
        required
      >
    </div>
    <div class="form-group">
      <input
        class="form-control"
        placeholder="Password"
        type="password"
        v-model="password"
        required
      >
    </div>

    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">Sign in</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router.js'
import toastr from 'toastr'
toastr.options.toastClass = 'toastr'

export default {
  name: 'SignInCard',
  data: function() {
    return {
      accountType: '',
      identityNumber: '',
      password: ''
    }
  },
  methods: {
    signin: async function() {
      const url = `http://localhost:3000/api/${
        this.accountType === 'renter' ? 'Renter' : 'VehicleOwner'
      }/${this.identityNumber}`
      const res = await axios.get(url)
      if (res.data.password === this.password) {
        VueCookies.set('account-type', this.accountType)
        VueCookies.set('id', this.identityNumber)
        router.push('/dashboard')
      } else toastr.error('Please check your identity card number or password')
    }
  }
}
</script>

<style scoped>
.btn-link {
  cursor: pointer;
}
</style>
