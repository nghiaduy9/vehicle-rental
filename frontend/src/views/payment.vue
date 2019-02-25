<template>
  <div class="container w-50" v-if="cookieCheck">
    <h4>Payment</h4>
    <p class="text-center">{{noti}}</p>
    <form @submit.prevent="payment">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Rental Agreement Id"
          type="number"
          required
          v-model="rentalId"
        >
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Time End" type="date" required v-model="timeEnd">
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Total Price"
          type="number"
          required
          v-model="totalPrice"
        >
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Currency" type="text" required v-model="currency">
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router.js'

async function getRental(rentalId) {
  let check = true
  let rental
  let p = await axios
    .get('http://localhost:3000/api/RentalAgreement/' + rentalId)
    .then(function(res) {
      rental = res.data
    })
    .catch(function(e) {
      if (e) {
        check = false
      }
    })
  console.log(check)
  if (check) return rental
  else return false
}
export default {
  name: 'NewRental',
  data: function() {
    return {
      noti: '',
      cookieCheck: '',
      timeEnd: '',
      totalPrice: '',
      currency: 'USD',
      rentalId: ''
    }
  },
  created: function() {
    let t = VueCookies.get('account-type')
    this.cookieCheck = false
    if (t === 'lender') this.cookieCheck = true
    setInterval(function() {
      this.noti = ''
    }, 1000)
  },
  methods: {
    payment: async function() {
      let h = this
      let time = new Date(this.timeEnd).toISOString()
      h.noti = 'wait'
      let rental = await getRental(this.rentalId)
      console.log(rental)
      if (rental) {
        axios
          .post('http://localhost:3000/api/Payment', {
            $class: 'org.vehiclerental.Payment',
            timeEnd: time,
            totalPrice: this.totalPrice,
            currency: this.currency,
            rentalAgreement: 'resource:org.vehiclerental.RentalAgreement#' + h.rentalId,
            timestamp: new Date().toISOString()
          })
          .then(function(res) {
            console.log('payment success')
            h.noti = 'Successful'
          })
          .catch(function(e) {
            if (e) {
              h.noti = 'Unsuccessful'
            }
          })
      } else this.noti = 'Unsuccessful, rental is not existed'
    }
  }
}
</script>
