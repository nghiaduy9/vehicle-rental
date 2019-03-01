<template>
  <div class="container w-50" v-if="cookieCheck">
    <h4>Create rental agreement</h4>
    <p class="text-center">{{noti}}</p>
    <form @submit.prevent="newRental">
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Rental id"
          type="number"
          required
          v-model="rentalId"
        >
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Owner id" type="number" readonly v-model="ownerId">
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Renter id"
          type="number"
          required
          v-model="renterId"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Vehicle id"
          type="number"
          required
          v-model="vehicleId"
        >
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Price per day"
          type="number"
          required
          v-model="pricePerDay"
        >
      </div>
      <div class="form-group">
        <input class="form-control" placeholder="Deposit" type="number" required v-model="deposit">
      </div>
      <div class="form-group">
        <input
          class="form-control"
          placeholder="Time begin"
          type="date"
          required
          v-model="timeBegin"
        >
      </div>
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>

import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router.js'
async function getRealDetail(ownerId, renterId, vehicleId) {
  let check = true
  let lender, renter, vehicle
  let p1 = await axios
    .get('http://localhost:3000/api/VehicleOwner/' + ownerId)
    .then(async function(res) {
      lender = res.data
    })
    .catch(function(err) {
      if (err) {
        check = false
      }
    })
  let p2 = await axios
    .get('http://localhost:3000/api/Renter/' + renterId)
    .then(async function(r) {
      renter = r.data
    })
    .catch(function(e) {
      if (e) {
        check = false
      }
    })
  let p3 = await axios
    .get('http://localhost:3000/api/Vehicle/' + vehicleId)
    .then(function(response) {
      vehicle = response.data
    })
    .catch(function(e) {
      if (e) {
        check = false
      }
    })
  console.log(check)
  if (check) return [lender, renter, vehicle]
  else return false
}
export default {
  name: 'NewRental',
  data: function() {
    return {
      noti: '',
      cookieCheck: '',
      timeBegin: '',
      renterId: '',
      rentalId: '',
      ownerId: '',
      vehicleId: '',
      pricePerDay: '',
      deposit: ''
    }
  },
  created: function() {
    let t = VueCookies.get('account-type')
    this.ownerId = VueCookies.get('id')
    this.cookieCheck = false
    if (t === 'lender') this.cookieCheck = true
    setInterval(function() {
      this.noti = ''
    }, 1000)
  },
  methods: {
    newRental: async function() {
      let h = this
      h.noti = 'wait'
      let time = new Date(this.timeBegin).toISOString()
      console.log(time)
      let detail = await getRealDetail(h.ownerId, h.renterId, h.vehicleId)
      if (detail) {
        axios
          .post('http://localhost:3000/api/RentalAgreement', {
            $class: 'org.vehiclerental.RentalAgreement',
            rentalId: this.rentalId,
            lender: 'resource:org.vehiclerental.VehicleOwner#' + this.ownerId,
            renter: 'resource:org.vehiclerental.Renter#' + this.renterId,
            vehicle: 'resource:org.vehiclerental.Vehicle#' + this.vehicleId,
            pricePerDay: this.pricePerDay,
            deposit: this.deposit
          })
          .then(function(res) {
            console.log('Success create asset rental')
            axios
              .post('http://localhost:3000/api/Rental', {
                $class: 'org.vehiclerental.Rental',
                timeBegin: time,
                rentalAgreement: 'resource:org.vehiclerental.RentalAgreement#' + h.rentalId,
                timestamp: new Date().toISOString()
              })
              .then(function() {
                h.noti = 'Successful'
                console.log('Create rental transaction successfully')
              })
              .catch(function(e) {
                if (e) {
                  h.noti = 'Unsuccessful'
                }
              })
          })
          .catch(function(eee) {
            if (eee) {
              h.noti = 'Unsuccessful'
            }
          })
      } else h.noti = 'Unsuccessful'
    }
  }
}
</script>
