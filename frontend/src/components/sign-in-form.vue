<template>
  <form @submit.prevent="signIn">
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
import vuecookies from 'vue-cookies'
import router from '../router.js'
import toastr from 'toastr'
import bcrypt from 'bcryptjs'

const saltRounds = 10
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
    signIn: async function() {
      const url = `http://localhost:3000/api/${
        this.accountType === 'renter' ? 'Renter' : 'VehicleOwner'
      }/${this.identityNumber}`
      try {
        const { data } = await axios.get(url, { timeout: 3000 })
        const compare = await bcrypt.compare(this.password, data.password)
        if (compare) {
          vuecookies.set('id', this.identityNumber)
          vuecookies.set('fullname', data.name)
          vuecookies.set('account-type', this.accountType)
          router.push('/dashboard')
        } else toastr.error('Please recheck password')
      } catch (err) {
        toastr.error('Please recheck your ID card number')
      }
    }
  },
  mounted: function() {
    if (vuecookies.get('id')) router.push('/dashboard')
  }
}
</script>
