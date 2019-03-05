<template>
  <div class="container w-25 mx-auto my-5" v-if="cookieCheck">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">NEW VEHICLE</h5>
        <hr>
        <form @submit.prevent="newVehicle">
          <div class="form-group">
            <input
              class="form-control"
              placeholder="License plate"
              type="text"
              v-model="licensePlate"
            >
          </div>
          <div class="form-group">
            <input class="form-control" placeholder="Model" type="text" v-model="model">
          </div>
          <div class="form-group">
            <input class="form-control" placeholder="Color" type="text" v-model="colour">
          </div>
          <div class="form-group">
            <input class="form-control" placeholder="State" type="text" v-model="state">
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Price per day"
              type="number"
              v-model="pricePerDay"
            >
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Year of manufacture"
              type="number"
              v-model="yearOfManufacture"
            >
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Skeleton Number"
              type="text"
              v-model="skeletonNumber"
            >
          </div>
          <div class="form-group">
            <input
              class="form-control"
              placeholder="Engine Number"
              type="text"
              v-model="engineNumber"
            >
          </div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router.js'
import toastr from 'toastr'
toastr.options.toastClass = 'toastr'

function IDGenerator() {
  this.length = 8
  this.timestamp = +new Date()
  var _getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  this.generate = function() {
    var ts = this.timestamp.toString()
    var parts = ts.split('').reverse()
    var id = ''
    for (var i = 0; i < this.length; ++i) {
      var index = _getRandomInt(0, parts.length - 1)
      id += parts[index]
    }
    return id
  }
}
export default {
  name: 'NewVehicle',
  data: function() {
    return {
      cookieCheck: '',
      ownerId: '',
      vehicleId: '',
      licensePlate: '',
      model: '',
      colour: '',
      state: '',
      yearOfManufacture: '',
      skeletonNumber: '',
      engineNumber: '',
      pricePerDay: ''
    }
  },
  mounted: function() {
    let t = VueCookies.get('account-type')
    this.ownerId = VueCookies.get('id')
    this.cookieCheck = false
    if (t === 'lender') this.cookieCheck = true
  },
  methods: {
    newVehicle: async function() {
      let url = 'http://localhost:3000/api/VehicleOwner/' + this.ownerId
      let res = await axios.get(url)
      let owner = {
        $class: 'org.vehiclerental.OwnerConcept',
        OwnerIdentityCardNumber: res.data.OwnerIdentityCardNumber,
        name: res.data.name,
        address: res.data.address,
        phone: res.data.phone
      }
      let renter = {
        $class: 'org.vehiclerental.RenterConcept',
        RenterIdentityCardNumber: '',
        name: '',
        address: '',
        phone: ''
      }
      const generator = new IDGenerator()
      this.vehicleId = generator.generate()
      let response = await axios.post('http://localhost:3000/api/Vehicle/', {
        $class: 'org.vehiclerental.Vehicle',
        vehicleId: this.vehicleId,
        licensePlate: this.licensePlate,
        lender: owner,
        identityCardNumber: this.ownerId,
        model: this.model,
        color: this.colour,
        state: this.state,
        yearOfManufacture: this.yearOfManufacture,
        skeletonNumber: this.skeletonNumber,
        engineNumber: this.engineNumber,
        vehicleStatus: 'available',
        renter: renter,
        pricePerDay: this.pricePerDay,
        timeBegin: '1970-01-01T00:00:00.000Z'
      })
      if (response.status === 200) router.push('/dashboard')
      else toastr.error('Unsuccessful')
    }
  }
}
</script>
