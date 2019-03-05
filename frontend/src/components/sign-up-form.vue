<template>
  <form @submit.prevent="signup">
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
      <input class="form-control" placeholder="Full name" type="text" v-model="name" required>
    </div>
    <div class="form-group">
      <input class="form-control" placeholder="Address" type="text" v-model="address" required>
    </div>
    <div class="form-group">
      <input class="form-control" placeholder="Phone number" type="number" v-model="phone" required>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-block">Sign up</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import toastr from 'toastr'
import bcrypt from 'bcryptjs'

const saltRounds = 10
toastr.options.toastClass = 'toastr'

export default {
  name: 'SignUpCard',
  data: function() {
    return {
      accountType: '',
      identityNumber: '',
      password: '',
      name: '',
      address: '',
      phone: '',
      hash: ''
    }
  },
  methods: {
    signup: async function() {
      this.hash = bcrypt.hashSync(this.password, saltRounds)
      if (this.accountType === 'renter') {
        const newUser = {
          $class: 'org.vehiclerental.Renter',
          RenterIdentityCardNumber: this.identityNumber,
          name: this.name,
          address: this.address,
          phone: this.phone,
          accountType: this.accountType,
          password: this.hash
        }
        const res = await axios.post('http://178.128.24.80:3000/api/Renter', newUser)
        if (res.status === 200) toastr.success('Success')
        else toastr.error('Identity card number existsed')
      } else {
        const newUser = {
          $class: 'org.vehiclerental.VehicleOwner',
          OwnerIdentityCardNumber: this.identityNumber,
          name: this.name,
          address: this.address,
          phone: this.phone,
          accountType: this.accountType,
          password: this.hash
        }
        let res = await axios.post('http://178.128.24.80:3000/api/VehicleOwner', newUser)
        if (res.status === 200) toastr.success('Success')
        else toastr.error('Identity card number exists already')
      }
    }
  }
}
</script>
